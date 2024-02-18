const schedule = require("node-schedule");
const pool = require("../lib/dbConnPool");
const mapper = require("../sql");

const batchUpdateNovAndAuthor = async () => {
  // 매일 오전 00:00 실행
  // schedule.scheduleJob("초 분 시 일 월 몇주", async () => {
  schedule.scheduleJob("* 0 0 * * *", async () => {
    const client = await pool.connect();
    let sqlId;

    try {
      // 쿼리 시작
			// 트랜잭션: 여러 개의 SQL 명령을 하나의 논리적인 단위로 묶어서 실행하는 것, 트랜잭션 내에서 실행되는 모든 SQL 명령은 한 번에 커밋(적용)되거나 롤백(취소)됨.
      
      // 트랜잭션을 시작하기 위한 명령어
      await client.query("BEGIN");
      
      let main_seqno = [];                          // 30일 경과된 메인 소설 순번 배열
      const sub_seqno = [];                         // 메인 소설에 엮인 서브 소설 순번 배열
      let sub_created_user = [];                    // 좋아요를 가장 많이 받은 서브 소설의 작가 아이디 배열
      const sub_more_than_zero_main_seqno = [];     // 서브 소설이 하나 이상 존재하는 메인 소설 순번 배열
      const like_more_than_zero_main_seqno = [];    // 서브 소설 중 좋아요가 적어도 하나 이상인 메인 소설 순번 배열
      let postpone_main_seqno = [];                 // 30일 경과 후 엮인 서브 소설이 하나도 없는 메인 소설 순번 배열

      // 작성한지 30일 경과된 미완성 메인 소설 조회
      sqlId = "Schedule.checkIncompleteNov";
      const mainNov = await client.query(mapper.makeSql(sqlId, {}));
      mainNov.rows.forEach((nov) => main_seqno.push(nov.novel_seqno));

      // main_seqno 배열에 메인 소설 존재할 경우
      if (main_seqno.length > 0) {
        // 엮인 서브 소설이 하나 이상 존재하는 미완성 메인 소설 조회
        sqlId = "Schedule.checkElectedIncompleteNov";
        const electedMainNov = await client.query(mapper.makeSql(sqlId, { main_seqno }));
        electedMainNov.rows.forEach((nov) => sub_more_than_zero_main_seqno.push(nov.main_novel_seqno));
      
        // 완성 소설 승급이 미뤄지는 메인 소설 순번 세팅
        postpone_main_seqno = main_seqno.filter(seq => !sub_more_than_zero_main_seqno.includes(seq));
        
        // 좋아요 수가 가장 많은 서브 소설 정보 조회(좋아요가 최소 0개 이상이어야 함)
        sqlId = "Schedule.getMostLikeWriter";
        const mostLikeNov = await client.query(
          mapper.makeSql(sqlId, { sub_more_than_zero_main_seqno })
        );
        mostLikeNov.rows.forEach(nov => {
          // complete_yn이 'Y'로 변경될 서브 소설 순번 세팅
          sub_seqno.push(nov.sub_novel_seqno);
          // 작가로 권한 변경되어야 할 유저 아이디 세팅
          sub_created_user.push(nov.sub_author_id);
          // 엮인 서브 소설 중 좋아요가 적어도 하나 이상인 메인 소설 순번 세팅
          like_more_than_zero_main_seqno.push(nov.main_novel_seqno);
        })
        
        // 승급될 유저 아이디 중복 값 제거(예: boo@novely.com가 쓴 서브 소설 여러개 당선 시)
        sub_created_user = Array.from(new Set(sub_created_user));
        // 서브 소설 중 좋아요가 전부 0인 메인 소설 seqno를 기존 승급 연기 대상인 메인 소설 seqno에 추가
        postpone_main_seqno = Array.from(new Set([ ...postpone_main_seqno, ...sub_more_than_zero_main_seqno.filter(v => !like_more_than_zero_main_seqno.includes(v)) ]));

        // 완성 소설 테이블에 데이터 입력
        sqlId = "Schedule.postCompleteNovel";
        await client.query(
          mapper.makeSql(sqlId, { mostLikeNov: mostLikeNov.rows })
        );

        // 완성 소설 승급이 미뤄진 메인 소설들의 작성일자 초기화
        if (postpone_main_seqno.length > 0) {
          sqlId = "Schedule.initCreatedDatePostponeNov";
          await client.query(mapper.makeSql(sqlId, { postpone_main_seqno }));
        }

        // 미완 메인 소설 완성 여부 Y로 일괄 변경
        sqlId = "Schedule.patchNovToComplete";
        await client.query(
          mapper.makeSql(sqlId, { like_more_than_zero_main_seqno })
        );

        // 미완 서브 소설 완성 여부 Y로 일괄 변경
        sqlId = "Schedule.patchSubNovToComplete";
        await client.query(
          mapper.makeSql(sqlId, { like_more_than_zero_main_seqno })
        );

        // 좋아요 수 가장 많은 일반 유저들의 권한을 작가로 일괄 변경
        sqlId = "Schedule.patchToAuthor";
        await client.query(
          mapper.makeSql(sqlId, { sub_created_user })
        );

        console.log(
          `현재 기준 작성한지 30일이 넘어 승급될 미완 메인 소설들의 seqno는 ${main_seqno} 입니다.
          서브 소설이 존재하지 않거나, 좋아요가 없어 승급이 미루어질 메인 소설들의 seqno는 ${postpone_main_seqno},
          승급이 이루어질 메인 소설들의 seqno는 ${like_more_than_zero_main_seqno} 입니다.
          승급될 서브 소설의 작가 ID는 ${sub_created_user} 입니다. 
          일괄 업데이트 완료되었습니다.`
        );
      }
        
      // 쿼리 실행 이상없다면 커밋
      await client.query("COMMIT");
    } catch (err) {
      // 쿼리 실행 도중 에러 발생 시 roll back
      await client.query("ROLLBACK");
      console.log(err);
    } finally {
      if (client) client.release();
    }
  });
};

module.exports = batchUpdateNovAndAuthor;
const schedule = require("node-schedule");
const pool = require("../lib/dbConnPool");
const mapper = require("../sql");

const batchUpdateNovAndAuthor = async () => {
  // 매일 오전 00:00 실행
  schedule.scheduleJob("0 0 0 * * *", async () => {
    const client = await pool.connect();
    let sqlId;

    try {
      // 쿼리 시작
      await client.query("BEGIN");
      
      // 미완 메인, 서브 소설 순번 및 좋아요를 가장 많이 받은 작성자의 아이디를 담을 배열
      const main_seqno = [];
      const sub_seqno = [];
      const sub_created_user = [];

      // 미완성 메인 소설 조회
      sqlId = "Schedule.checkIncompleteNov";
      const mainNov = await client.query(mapper.makeSql(sqlId, {}));
      mainNov.rows.forEach((nov) => {
        main_seqno.push(nov.novel_seqno);
      });

      if (main_seqno.length > 0) {
        // 30일 경과된 main novel에 엮인 서브 소설들의 순번 조회
        sqlId = "Schedule.getSubNovelSeqnos";
        const subNov = await client.query(
          mapper.makeSql(sqlId, { main_seqno })
        );
        subNov.rows.forEach((subNov) => {
          sub_seqno.push(subNov.sub_novel_seqno);
        });

        // 좋아요 수가 가장 많은 서브 소설 정보 조회
        sqlId = "Schedule.getMostLikeWriter";
        const mostLikeNov = await client.query(
          mapper.makeSql(sqlId, { main_seqno })
        );
        // 작가로 권한 변경되어야 할 유저 아이디 목록 생성  
        mostLikeNov.rows.forEach((user) => {
          sub_created_user.push(user.sub_author_id);
        });

        // 완성 소설 테이블에 데이터 입력
        sqlId = "Schedule.postCompleteNovel";
        await client.query(
          mapper.makeSql(sqlId, { mostLikeNov: mostLikeNov.rows })
        );
        
        // 미완 메인 소설 완성 여부 Y로 일괄 변경
        sqlId = "Schedule.patchNovToComplete";
        await client.query(
          mapper.makeSql(sqlId, { main_seqno })
        );

        // 미완 서브 소설 완성 여부 Y로 일괄 변경
        sqlId = "Schedule.patchSubNovToComplete";
        await client.query(
          mapper.makeSql(sqlId, { sub_seqno })
        );

        // 좋아요 수 가장 많은 일반 유저들의 권한을 작가로 일괄 변경
        sqlId = "Schedule.patchToAuthor";
        await client.query(
          mapper.makeSql(sqlId, { sub_created_user })
        );

        console.log(`현재 기준 작성한지 30일이 넘었으며, 미완 메인 소설 seqno는 ${main_seqno}, 미완 서브 소설들의 seqno는 ${sub_seqno}, 
                    가장 많은 좋아요를 받은 서브 소설의 작가 ID는 ${sub_created_user[0]} 입니다. 일괄 업데이트 완료되었습니다.`);
      }
        
      // 쿼리 실행 이상없다면 커밋
      await client.query("COMMIT");
    } catch (err) {
      // 쿼리 실행 도중 에러 발생 시 roll back
      await client.query("ROLLBACK");
      console.log(err);
    }
  });
};

module.exports = batchUpdateNovAndAuthor;
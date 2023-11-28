const path = require('path');
const fs = require('fs');

/**
 * @creator HSJ
 * @description 파일 업로드 미들웨어
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const fileUpload = async (req, res, next) => {
  try {
    // 첨부된 파일이 없는 경우 다음 과정 진행
    if (!req.file) {
      next();
      return; 
    }

    // 저장 경로 설정(프로젝트 폴더 파일 경로)
    const documentDir = path.join(__dirname, `../../image/profile`);

    // 경로 존재 확인. 경로가 존재하지 않는다면 생성.
    fs.existsSync(documentDir) || fs.mkdirSync(documentDir, { recursive: true });

    // 파일 정보 생성
    const originalname = Buffer.from(req.file.originalname, 'latin1').toString('utf8'); // latin1: 한글깨짐 방지
    const ext = originalname.slice(originalname.lastIndexOf('.') + 1);
    const file_name = req.body.login_id + '.' + ext;

    // 경로 및 파일명 설정
    const newPath = path.join(documentDir, file_name);

    // 이미 이미지가 존재할 경우 경로
    const oldPath = path.join(documentDir, req.body.old_img_name);

    req.body.image_file_name = file_name;

    // 이미 id@novely.com으로 만들어진 이미지가 존재한다면 삭제
    if (fs.existsSync(oldPath)) {
      // fs.rmdir(oldPath, { recursive: true }), (error) => {
      //   console.log(error);
      // };
      fs.rm(oldPath, { recursive: true }, error => console.log(error));
    }
    
    // 업로드 파일 저장
    fs.writeFile(newPath, req.file.buffer, (error) => {
      if (error) next(error);
      else console.log('profile image file created');
    });

    next();

  } catch (err) {
    console.log(err);
  }
};


module.exports = { 
  fileUpload 
};
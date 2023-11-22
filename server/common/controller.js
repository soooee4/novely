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
    // 저장 경로 설정(프로젝트 폴더 파일 경로)
    const documentDir = path.join(__dirname, `../../image/${req.body.login_id}`);

    // 경로 존재 확인. 경로가 존재하지 않는다면 생성.
    fs.existsSync(documentDir) || fs.mkdirSync(documentDir, { recursive: true });

    // 경로 및 파일명 설정
    const newPath = path.join(documentDir, req.file.originalname);

    // 업로드 파일 저장
    fs.writeFile(newPath, req.file.buffer, (error) => {
      
      if (error) next(error);
      // else console.log(`${} file created`)
    });

    next();
  } catch (err) {
    // next(errorCheck(err));
    console.log(err);
  }
};


module.exports = { 
  fileUpload 
};

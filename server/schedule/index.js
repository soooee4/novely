// 30일 지난 미완 소설에 대한 정보 업데이트(완료 소설, 작가 승급)
const batchUpdateNovAndAuthor = require('./batchUpdateNovAndAuthor');

// schedule process start function
const start = () => {
  batchUpdateNovAndAuthor();
}

module.exports = { start };
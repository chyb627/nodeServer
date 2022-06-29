const express = require('express');
const path = require('path');

const app = express();

app.set('port', process.env.PORT || 3000);

// 미들웨어는 중복이되는 것을 제거하기 위해 사용
app.use((req, res, next) => {
  console.log('모든 요청에 실행하고 싶어요');
  next();
}
  // ,(req,res)=> {throw new Error('에러임');}
)

// 라우터
app.get('/', (req, res) => {
  // res.send('hello express');
  res.sendFile(path.join(__dirname, 'index.html'));
});
app.post('/', (req, res) => {
  res.send('hello express');
  // === res.status(200).send('hello express');
});
app.get('/about', (req, res) => {
  res.send('hello about');
});
app.get('/category/js', (req, res) => {
  res.send('hello JavaScript!');
});

//와일드 카드 
//위에서 부터 실행되므로 /category/js 일경우는 위 아닌경우 와일드카드로 빠짐.
app.get('/category/:name', (req, res) => {
  res.send(`hello ${req.params.name}`);
});

// 404처리 미들웨어 (라우터밑, 에러처리위에 위치시킨다)
// 라우터 전부다 검색했는데 안떴으면 404이므로.
app.use((req, res, next) => {
  // res.send('404 Error')
  res.status(404).send('404 Error')
})

//에러 처리, 에러 미들웨어, 파라미터 4개 반드시 다 넣어야한다. 라우터 맨 밑에 추가.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('실제 화면에 보여줄 에러문구 대채 내용 삽입');
})

app.listen(3000, () => {
  console.log('익스프레스 서버 실행');
});
const http = require('http');

//파일 읽기위해 사용
const fs = require('fs').promises;

const server = http.createServer(async (req, res) => {
    try {
        //사파리같은 경우 html인지 문자열인지 못알아 먹기 때문 그런 브라우저를 처리하기 위한 코드.
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        // res.write('<h1>Hello Node!</h1>')
        // res.write('<p>Hello Server!</>')
        // res.end('<p>Hello YB!</p>')
        const data = await fs.readFile('./server.html');
        res.end(data);
    } catch (error) {
        console.error(err);
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end(err.message);
    }
})
    .listen(8080
        //     , () =>{
        //     console.log("8080번 포트에서 서버 대기 중입니다.")
        // }
    );
// 80번으로 하면 :80 생략가능.
server.on('listening', (error) => {
    // console.error(error);
    console.log("8080번 포트에서 서버 대기 중입니다.")
});
server.on('error', (error) => {
    console.error(error);
});
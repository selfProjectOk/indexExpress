var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

//可以分别设置http、https的访问端口号
var PORT = 80;
var SSLPORT = 443;

//使用nodejs自带的http、https模块
var http = require('http');
var https = require('https');

//根据项目的路径导入生成的证书文件
var privateKey  = fs.readFileSync(path.join(__dirname, './certificate/private.pem'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, './certificate/file.crt'), 'utf8');
var credentials = {key: privateKey, cert: certificate};

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

//创建http服务器
httpServer.listen(PORT, function() {
  console.log('HTTP Server is running on: http://localhost:%s', PORT);
});

//创建https服务器
httpsServer.listen(SSLPORT, function() {
  console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});


app.use(express.static('dist',{
    setHeaders: function (res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', '');
    }
}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/' + 'index.html');
})

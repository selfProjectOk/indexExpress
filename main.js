var express = require('express');
var app = express();

app.use(express.static('dist',{
    setHeaders: function (res) {
        res.setHeader('Access-Control-Allow-Origin', '*')
    }
}));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/' + 'index.html');
})

var server = app.listen(3000, function () {
    var port = server.address().port
    console.log("port:" + port)
})
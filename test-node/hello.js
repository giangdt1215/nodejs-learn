const http = require('http');

const hostname = '127.0.0.1';
const port = '8080';

//create http server
const server = http.createServer(function(req, res){
    // set response header
    res.writeHead(200, {"Content-Type": "text/plain"});

    //send response body
    res.end("hello");
})

//print a log when server start listening
server.listen(port, hostname, function() {
    console.log("server running at http://" + hostname + ":" + port);
})

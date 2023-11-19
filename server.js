'use stict'; 

let http = require('http');

function requestCallback(request, response){
    console.log("Hello");
}



let server = http.createServer(requestCallback);

server.listen(8000);

console.log("Listening...");
require('./app/index')  

var http = require('http')

var server = http.createServer(function(request, response){

    if(request.method === 'GET' && request.url === '/index'){
        
    }


}).listen(8080);
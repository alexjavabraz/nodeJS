var http = require('http')

http.createServer(function(request, response){
    if(request.method === 'GET' && request.url === '/echo'){
        var body = [];
        request.on('data', function(chunck){
            body.push(chunck);
        }).on('end', function(){
             body = Buffer.concat(body).toString();
             response.end(body);
        }).on('error', function(err){
            console.error(err);
        });
        response.writeHead(200, {'Content-Type':'text/html', 'X-Powered-By':'bacon'});

        response.write('<html>');
        response.write('<body>')
        response.write('<h1>Hello, World!</h1>')
        response.write('</body>')
        response.write('</html>');

    }else{
        response.statusCode = 404;
    }

    response.end();

}).listen(8080);
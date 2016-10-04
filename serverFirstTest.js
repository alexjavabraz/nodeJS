var http = require('http')

var server = http.createServer(
    function(request, response){
        //magic happens here!
        var method    = request.method;
        var url       = request.url;
        var headers   = request.headers;
        var userAgent = headers['user-agent']
        var body      = [];

        request.on('data', function(chunck){
            body.push(chunck)
        }).on('end', function(){
            body = Buffer.concat(body).toString();

            response.on('error', function(err){
                console.error(err);
            });

            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');

            // esta linha pode ser substituida por 
            // response.writeHead(200, {'Content-Type':'application/json'})

            var responseBody = {
                headers: headers,
                method: method,
                url: url,
                body: body
            };

            response.write(JSON.stringify(responseBody));
            response.end();

        }).on('error', function(err){
            console.error(err.stack);
        });

}).listen(8080);//activates this server, listening on port 8080

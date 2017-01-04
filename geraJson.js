//Lets require/import the HTTP module
var http = require('http');
var HttpDispatcher = require('httpdispatcher');
var dispatcher     = new HttpDispatcher();
//Lets define a port we want to listen to
const PORT=3000; 

//We need a function which handles requests and send response
//Lets use our dispatcher
function handleRequest(request, response){
    try {
        //log the request on console
        console.log(request.url);
        //Disptach
        dispatcher.dispatch(request, response);
    } catch(err) {
        console.log(err);
    }
}

//For all your static (js/css/images/etc.) set the directory name (relative path).
//dispatcher.setStatic('resources');

//A sample GET request    
/*
dispatcher.onGet("/page1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Page One');
});    

//A sample POST request
dispatcher.onPost("/post1", function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Got Post Data');
});
*/

dispatcher.onGet("/q", function(req, res) {
process(req, res);
});

dispatcher.onPost("/q", function(req, res) {
process(req, res);
});

function process(req, res){
    console.log(req.params);
    console.log(req.body);
     var resultado = {'idUsuario':'', 'mensagem':'Usuario nao encontrado'};

    if(req.params != null && req.params.name != 'undefined'){
        var usuario = req.params.email;
        var senha   = req.params.password;

        console.log(req.params.name);
        console.log(req.params.email);
        console.log(req.params.password);
        console.log(req.params.mac);

        if((usuario != 'alexjavabraz@gmail.com')){
            resultado = {'idUsuario':'', 'mensagem':'Usuário ou senha inválida', 'nomeUsuario':''};
            console.log('Invalido')
        }else{
            resultado = {'idUsuario':'1', 'mensagem':'', 'nomeUsuario':'Alex Simas Braz'};
             console.log('Valido')
        }

        
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    myJSONstring = JSON.stringify(resultado);
    res.end(myJSONstring);
}

var server = http.createServer().listen(PORT);


server.on('request', function (req, res) {
     console.log("Server listening on: http://localhost:%s", PORT);
    dispatcher.dispatch(req, res);  
});
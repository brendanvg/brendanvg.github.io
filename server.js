var finalhandler=require('finalhandler')
var http = require('http')
var serveStatic = require('serve-static')
var textBody = require('body')
var formBody = require('body/form')
var anyBody = require('body/any')
var ecstatic = require('ecstatic')
 // Serve up public/ftp folder 
 /*var serve = serveStatic('/Users/joncox/webdev/JThing/foundation-5.5.2', {'index': ['index.html', 'index.htm']})
  
  // Create server 
  var server = http.createServer(function(req, res){
      var done = finalhandler(req, res)
        serve(req, res, done)
  
  })

  */

http.createServer(function handleRequest(req,res){
	
		ecstatic({ root: __dirname + '/public'})
  	
  		function send(err,body){
  			sendJson(req,res,body)
  		}
  		if (req.url === '/form'){
  			formBody(req,{},send)
  			console.log(res)
  		}
  		else if (req.url === '/any'){
  			anyBody(req,res,{},send)
  		}

  	}


).listen(3001)




  

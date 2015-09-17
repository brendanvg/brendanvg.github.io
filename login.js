var accoundown = require('accountdown');
var level = require('level')
var db=level('./users.db')

var auth= require('cookie-auth')(opts)
var basic= require('basic')

//Accountdown (James)
var users= accountdown(db, {
	login: {basic:require('accountdown-basic')}
})

var opts = {
	login: {basic: { username: 'brendan', password: 'beep boo'}},
	value: { bio: 'beep boop'}
}

users.create('substack', opts, function (err){
	if (err) return console.error(err)
})



var creds = { username:'brendan', password: 'beep boop'}
users.verify('basic', creds, function (err, ok id){
	if (err) return console.error(err)
		console.log('ok=', ok)
		console.log('id=', id)
})




//Cookie-Auth (Karissa)
function authenticator(req,res,cb){

	doSomeAuthThing(req,res,function(err){
		//e.g. if not authorized
		cb(err)

		//otherwise, if authorized
		cb()
	})
}

var basicAuthenticator = basic(function (user, pass, callback){
	if (user === 'test' && pass === 'pass') return callback(null)
	callback(new Error("Access Denied"))	
})

var auth = Auth ({ //??? JSON?
	name: 'my-application',
	authenticator: basicAuthenticator
})

router.addRoute('/login', function(req,res){
	var self= this //?????? 
	auth.handle(req, res, function(err,session){
		if (err) return auth.logout(req,res)
		res.end(JSON.stringify(session))
	})
})

router.addRoute('/layout', function(req,res){
	return auth.logout(req,res)
})


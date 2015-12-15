var Book = require('../models/book.js');
var User = require('../models/user.js');
var bookGoogle = require('google-books-search');
var jwt = require('jsonwebtoken');
var config = require('../../config.js');

var superSecret = config.secret;

module.exports = function(app,express) { 
	var bookApiRouter = express.Router(); 	// get an instance of the express Router
 
 

 // middleware to use for all requests
 bookApiRouter.use(function(req, res, next) {
 	// do logging
 	console.log('Somebody just came to our app!');
 
	// check header or url parameters or post parameters for token
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
 
    // decode token
    if (token) {
 
     // verifies secret and checks exp, if successful we will take out the information in the token pass it along ot 'decoded'
     jwt.verify(token, superSecret, function(err, decoded) {      
       if (err) {
         return res.status(403).send({ 
             success: false, 
           message: 'Failed to authenticate token.' 
         });    
       } else {
         // if everything is good, save to request for use in other routes
         req.decoded = decoded;   
 
         next();
 
       } 
     });
 
   } else {
 
     // if there is no token
     // return an HTTP response of 403 (access forbidden) and an error message
     return res.status(403).send({ 
       success: false, 
       message: 'No token provided.' 
     });
     
   }
 

});

// test route to make sure everything is working 
// (accessed at GET http://localhost:8080/api)
bookApiRouter.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our Book Api!' });	
});
//on routes that end in /books
//============================================
bookApiRouter.route('/books')
	.get(function(req,res){
		Book.find(function(err,books){
			if(err) res.send(err);
			console.log(books);
			res.json(books);
		})
	})
	.post(function(req,res){
		//Create a new instance of the book model
		
		console.log(req.body.newBook);
		console.log(req.body.username);
		User.find({'username':req.body.username},function(err,user){
			if(err)
				res.send(err);
			console.log(user);
			//console.log(user_id);
			
			//console.log(book.subscribers);
		
		bookGoogle.search(req.body.newBook,function(error,results){
			if(error) {
				console.log(error);
				res.send(error);
			}
			console.log(results[0]);
			var result = results[0];
			var book = new Book({
				_id : result.id,			
				name : result.name,
				thumbnail : result.thumbnail,
				link : result.link
			});
			book.subscribers.push(user[0].id);
			//save the book and check for errors
			book.save(function(err){
				if(err) {
					if(err.code == 11000) {
						return res.json({success:false,message:'bookname already exists'});
					}
					else
						res.send(err);
				}

				res.json({message:'book Created'});
			});
		});
	});

			
	});
//====================================================
//
//on route that end in /books/:username
//=====================================================
bookApiRouter.route('/books/:username')
	.get(function(req,res){
		console.log(req.params.username);
		User.find({'username':req.params.username},function(err,user){
			if(err)
				res.send(err);
			Book.find({'subscribers': user[0]._id},function(err,books){
			if(err) res.send(err);
			console.log(books);
			res.json(books);
			});
		});
		
	});
	/*
	.put(function(req,res){
		book.findById(req.params.book_id,function(err,book){
			if(err) res.send(err);

			//update the book's info only if it was sent in body(if it has actually changed)
			if(req.body.name) book.name = req.body.name;
			if(req.body.bookname) book.bookname = req.body.bookname;
			if(req.body.password) book.password = req.body.password;

			book.save(function(err){
				if(err) res.send(err);
				res.json({message:'book has been updated'});
			})
		})
	})
	.delete(function(req,res){
		book.remove(req.params.book_id,function(err,book){
			if(err) res.send(err);
			res.json({message:'Successfully removed book from Database'})
		})
	});
	/*
	// api endpoint to get book information
 	bookApiRouter.get('/me', function(req, res) {
   		res.send(req.decoded);
 	});
	*/
 	return bookApiRouter;

}
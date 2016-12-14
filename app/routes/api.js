
var User=require('../models/user');
var Sell=require('../models/sells');
var jwt = require('jsonwebtoken');
var secret='paninni';
var validate = require('mongoose-validator');
var mongoose=require('mongoose');
var nev = require('email-verification')(mongoose);
var  bcrypt = require('bcryptjs');
var expressValidator= require('express-validator');
var expressSession= require('express-session');
var multer  = require('multer')
var upload = multer()











module.exports= function(router){


	//sync version of hashing function
var myHasher = function(password, tempUserData, insertTempUser, callback) {
  var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  return insertTempUser(hash, tempUserData, callback);
};

// async version of hashing function
myHasher = function(password, tempUserData, insertTempUser, callback) {
  bcrypt.genSalt(8, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      return insertTempUser(hash, tempUserData, callback);
    });
  });
};




// NEV configuration =====================
nev.configure({
  persistentUserModel: User,
  expirationTime: 600, // 10 minutes
  verificationURL: 'http://localhost:8080/verify/${URL}',
  transportOptions: {
    service: 'Gmail',
    auth: {
     user: 'listmidd@gmail.com',
      pass: 'middlebury2017'
    }
  },

  hashingFunction: myHasher,
  passwordFieldName: 'pw',
}, function(err, options) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('configured: ' + (typeof options === 'object'));
});






// create a temporary User model
nev.generateTempUserModel(User, function(err, tempUserModel) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
});


	// user registration
	router.post('/users', function(req, res){
		var user= new User();
		user.name= req.body.name;
		user.email= req.body.email;
		user.pw= req.body.password;
		var email=req.body.email;
		
		


	// if email or password field is empty respond to the user
	if(req.body.email==null|| req.body.email==''||req.body.password==null|| req.body.password==''||req.body.name==null|| req.body.name==''){
		
		res.json({success:false, message:'ensure email or password were entered '});

	}
	// otherwise, create temporary user
	else{

		// check the validity of email and password
			req.check('email', 'Invalid email address').isEmail();
			req.check("password", "password must be at least 8 characters, one symbol , 1 upper case").matches( /^((?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W])).{8,40}$/, "i");


			var errors = req.validationErrors();
  			if (errors) {
  				console.log(errors);
   
  				return res.json({
					          	success:false, message: errors[0]["msg"] });
	 		 } 



	 		 // if there is no error with our email or password, we send verification email to the user


	   nev.createTempUser(user, function(err, existingPersistentUser, newTempUser) {
	      if (err) {
	        return res.status(404).send('ERROR: creating temp user FAILED');
	      }

	      // user already exists in persistent collection
	      if (existingPersistentUser) {
	      
	        return res.json({
	        	success:false,
	          message: 'You have already signed up and confirmed your account. Did you forget your password?'
	        });
	      }

	      // new user created
	      if (newTempUser) {

	      	
	        var URL = newTempUser[nev.options.URLFieldName];

	        nev.sendVerificationEmail(email, URL, function(err, info) {
	          if (err) {
	            return res.status(404).send('ERROR: sending verification email FAILED');
	          }
	          
	          res.json({
	          	success:true,
	            message: 'An email has been sent to you. Please check it to verify your account.',
	            info: info
	          });
	        });

	      
	      } else {
	    
	        res.json({
	        success:true,
	          message: 'You have already signed up. Please check your email to verify your account.'
	        });
	      }
	    });












		













	// 	user.save(function(err){
	// 	if (err) {
	// 		if(err.errors!=null){
	// 			if (err.errors.name) {
	// 				res.json({success:false, message:err.errors.name.message});
	// 			}
	// 			else if(err.errors.email){
	// 				res.json({success:false, message:err.errors.email.message});
	// 			}
	// 			else if(err.errors.password){
	// 				res.json({success:false, message:err.errors.password.message});
	// 			}
	// 			else{
	// 				res.json({success:false, message:err});

	// 			}

	// 		}
	// 		else if(err){
	// 			if(err.code==11000){
	// 				res.json({success:false, message:'Email already taken '});

	// 			}
	// 			else{
	// 				res.json({success:false, message:err});
	// 			}

				

	// 		}

	// 		else{
	// 			res.json({success:true, message:'Your account has been created '});

	// 		}

	// 	}
	// 	else{
	// 		res.json({success:true, message:err});

	// 	}
		
	// });
	}

});

// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })

router.post('/upload', upload.single('avatar'),function(req, res){
	console.log("posting picture");
		//console.log(req.body.type);
		console.log(req.files);
		res.json({success: true});
	});


router.get('/verify/:URL', function(req, res) {
	console.log("yeeeeeees");

  var url = req.params.URL;

  nev.confirmTempUser(url, function(err, user) {
    if (user) {
       res.json({
        success:true,
          message: 'CONFIRMED!'
        });

    } 
    else {
       res.json({
        success:false,
          message: 'There is error confirming your email adress!'
        });
    }
  });
});






// 	router.get('/aSsAIzB2uoVORqy8fY2pWzOayl2YDkiJAZ7ZEEltYQ2VJ1dW', function(req, res) {
//   	var url = 'aSsAIzB2uoVORqy8fY2pWzOayl2YDkiJAZ7ZEEltYQ2VJ1dW'
//   	console.log('we are here');

//   	nev.confirmTempUser(url, function(err, user) {
//     if (user) {
//     	//console.log(user)
//       nev.sendConfirmationEmail(user.email, function(err, info) {
//         if (err) {
//         	res.json({success:false, message:'ERROR: sending confirmation email FAILED'});
          
//         }
//         	//res.json({success:true, message:'ERROR: sending confirmation email FAILED',info:info});

    
//       });
//     } else {
//      res.json({success:false, message:' confirmation email FAILED'});
//     }
//   });

// });
	router.post('/sells',function(req, res){
	var sell= new Sell();
	//console.log(sell);
	//req.body.title='not null';

	sell.title= req.body.title;
	sell.email= req.body.email;
  	sell.location=req.body.location;
  	sell.price=req.body.price;
  	sell.condition=  req.body.condition;
   sell.category=  req.body.category;
   sell. description=req.body. description;


   // sell.save();
   // res.send("sell item saved");

   if (req.body.title==null||req.body.title=='') {
   	res.json({success:false, message:'ensure that you have entered the title of what you are selling'});

   }
   else{
   	sell.save();
   	res.json({success:true, message:'your item has been posted for sale'});

   }

});

	router.post('/authenticate',function(req, res){

		User.findOne({email:req.body.email}).select('email pw').exec(function(err, user){
			//console.log(user);
			if (err) {
				throw err;
			}
			if (!user) {
				res.json({success:false, message:'could not find user '});

			}
			else if(user){
				

				if (req.body.password) {


						var validpassword=user.validPassword(req.body.password);
					



// 					var x=	bcrypt.compare("veggies", user.pw, function(err, res) {
//     // res = false
// });

					// console.log(x);

				}
				else{
					res.json({success:false, message:'no password '});

				}
					if(!validpassword){
						res.json({success:false, message:'wrong password '});

					}
					else{
						var token=jwt.sign({email:user.email},secret,{expiresIn:'24h'});
						res.json({success:true, message:'You are logged in ', token:token});

					}
			}

		});

	});



	router.use(function(req, res,next){
		var  token=req.body.token||req.body.query||req.headers['x-access-token'];
		if (token) {
			jwt.verify(token, secret, function(err, decoded) {
  			if (err) {
  				res.json({success:false, message:'No invalid'});

  			}
  			else{
  				// verified token
  				req.decoded=decoded;
  				next();
  			}
		});


		}else{
			res.json({success:false, message:'No token provided'});

		}


	});

	router.post('/profile',function(req,res){
		res.send(req.decoded);
	});

	router.put('/delete',function(req,res){

		console.log(req.body._id);

		Sell.remove({ title: req.body.title}, function (err) {
	  if (err) return handleError(err);
	  // removed!
	});
		//console.log("here");
		res.json({success:true, message:'we will delete your stuff '});
	});



	router.get('/sells',function(req,res){
		Sell.find({}).exec(function(err,result){
			if (err) {
				res.send(err);
			}else{
				res.send(result);

			}
			

		});
		//res.send(req.decoded);
	})
	// using login route
	return router;
}










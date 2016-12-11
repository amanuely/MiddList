
var User=require('../models/user');
var Sell=require('../models/sells');
var jwt = require('jsonwebtoken');
var secret='paninni';
var validate = require('mongoose-validator');
var mongoose=require('mongoose');
var nev = require('email-verification')(mongoose);
var  bcrypt = require('bcryptjs');








module.exports= function(router){


	// sync version of hashing function
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
		user.password= req.body.password;
		var email=req.body.email;
		
		console.log("request coming");


	// if email or password field is empty respond to the user
	if(req.body.email==null|| req.body.email==''||req.body.password==null|| req.body.password==''||req.body.name==null|| req.body.name==''){
		
		res.json({success:false, message:'ensure email or password were entered '});

	}
	// otherwise, create temporary user
	else{
				
				//console.log(user);





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
					      	console.log("temp user is created");
					        var URL = newTempUser[nev.options.URLFieldName];

					        nev.sendVerificationEmail(email, URL, function(err, info) {
					          if (err) {
					            return res.status(404).send('ERROR: sending verification email FAILED');
					          }
					          console.log("email sent");
					          res.json({
					          	success:true,
					            message: 'An email has been sent to you. Please check it to verify your account.',
					            info: info
					          });
					        });

					      // user already exists in temporary collection!
					      } else {
					      	console.log("already signed up");
					        res.json({
					        success:true,
					          message: 'You have already signed up. Please check your email to verify your account.'
					        });
					      }
					    });












			    // nev.createTempUser(user, function(err, existingPersistentUser, newTempUser) {
				   //    if (err) {
				   //    	console.log(err);
				      	
				   //    	res.json({success:false, message:'there is error with creating a temporary user'});
				   //    }


			    //   // user already exists in persistent collection
				   //    if (existingPersistentUser) {
				   //    	res.json({success:false, message:'You have already signed up and confirmed your account. Did you forget your password? '});
				   //    }


			    //   // new user created
				   //    if (newTempUser) {
				   //    	// create a new user
				   //    	 // var URL = newTempUser[nev.options.URLFieldName];
				   //    	  var URL = 'MQ8YaNXXUQaujf0Fw8hnU6sBv3WLeu21xyXfgrBeLumUbtqA'
				   
				   //    	  //console.log(URL);

					  //       nev.sendVerificationEmail(user.email, URL, function(err, info) {
					  //         if (err) {
					  //           	res.json({success: false, message:err});
					  //         }
					  //         	//res.json({success:true, message:'Email has been sent to you'});
					  //       });

				   //    // user already exists in temporary collection!
					  //     } 
					  //     else 
					  //     {

							// res.json({success:false, message:'you already signed up'});
				   //    }

			    // });






//user accesses the link that is sent
// router.GET('/email-verification/:URL', function(req, res) {
// 	console.log("here in the confirmation api");
//   var url = req.params.URL;
//   console.log(url);

//   nev.confirmTempUser(url, function(err, user) {
//     if (user) {
//       nev.sendConfirmationEmail(user.email, function(err, info) {
//         if (err) {
//           //return res.status(404).send('ERROR: sending confirmation email FAILED');
//         }
//         res.json({
//         	status:true,
//           message: 'CONFIRMED!',
//           info: info
//         });
//       });
//     } else {
//     	res.json({success:true, message:'Email has been sent to you'});
//       //return res.status(404).send('ERROR: confirming temp user FAILED');
//     }
//   });
// });

		







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


router.get('/verify/:URL', function(req, res) {
	console.log("yeeeeeees");

  var url = req.params.URL;

  nev.confirmTempUser(url, function(err, user) {
    if (user) {
      nev.sendConfirmationEmail(user.email, function(err, info) {
        if (err) {
          return res.status(404).send('ERROR: sending confirmation email FAILED');
        }
        res.json({
          message: 'CONFIRMED!',
          info: info
        });
      });
    } else {
      return res.status(404).send('ERROR: confirming temp user FAILED');
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

		User.findOne({email:req.body.email}).select('email password').exec(function(err, user){
			if (err) {
				throw err;
			}
			if (!user) {
				res.json({success:false, message:'could not find user '});

			}
			else if(user){
				

				if (req.body.password) {

						var validpassword=user.comparePassword(req.body.password);

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










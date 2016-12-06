
var User=require('../models/user');
var Sell=require('../models/sells');
var jwt = require('jsonwebtoken');
var secret='paninni';
var validate = require('mongoose-validator');
module.exports= function(router){

	// user registration
	router.post('/users', function(req, res){
	var user= new User();
	user.name= req.body.name;
	user.email= req.body.email;
	user.password= req.body.password;
	//console.log("printing");
	//console.log(req.body);
	
	if(req.body.email==null|| req.body.email==''||req.body.password==null|| req.body.password==''||req.body.name==null|| req.body.name==''){
		// console.log(req.body.email);
		// console.log(req.body.password);
		// console.log(req.body.name);
		res.json({success:false, message:'ensure email or password were entered '});

	}else{
		user.save(function(err){
		if (err) {
			if(err.errors!=null){
				if (err.errors.name) {
					res.json({success:false, message:err.errors.name.message});
				}
				else if(err.errors.email){
					res.json({success:false, message:err.errors.email.message});
				}
				else if(err.errors.password){
					res.json({success:false, message:err.errors.password.message});
				}
				else{
					res.json({success:false, message:err});

				}

			}
			else if(err){
				if(err.code==11000){
					res.json({success:false, message:'Email already taken '});

				}
				else{
					res.json({success:false, message:err});
				}

				

			}

			else{
				res.json({success:true, message:'Your account has been created '});

			}

		}
		else{
			res.json({success:true, message:err});

		}
		
	});
	}

});
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
	})
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










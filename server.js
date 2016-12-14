var express= require('express');
var app=express();
var port=process.env.PORT||8080;
var morgan= require('morgan');
var mongoose= require('mongoose');
var bodyParser = require('body-parser');
var router=express.Router();
var appRoutes= require('./app/routes/api')(router);
var path= require('path');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());
app.use(expressSession({secret: 'secret', saveUninitialized: false, resave: false}));
app.use(express.static(__dirname+'/public'));


 var multer = require('multer');
    var upload = multer({ dest: './uploads' });

app.use('/api', appRoutes);
mongoose.Promise = global.Promise;




mongoose.connect('mongodb://localhost:27017/middlistdb', function(err){
	if(err){
		console.log("cannot connect the database");

	}
	else{
		console.log("we are connected  to our database");

	}
});




app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

app.get('*', function(req,res){
	res.sendFile(path.join(__dirname+'/public/app/views/index.html'));

});

app.listen(port, function () {
	console.log("running the server on port"+port);
});





// var express = require('express'),
//   bodyParser = require('body-parser'),
//   app = express(),
//   mongoose = require('mongoose'),
//   bcrypt = require('bcryptjs'),
//   nev = require('../../index')(mongoose);
// mongoose.connect('mongodb://localhost/emailtest');

// // our persistent user model
// var User = require('./app/userModel');

// // sync version of hashing function
// var myHasher = function(password, tempUserData, insertTempUser, callback) {
//   var hash = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
//   return insertTempUser(hash, tempUserData, callback);
// };

// // async version of hashing function
// myHasher = function(password, tempUserData, insertTempUser, callback) {
//   bcrypt.genSalt(8, function(err, salt) {
//     bcrypt.hash(password, salt, function(err, hash) {
//       return insertTempUser(hash, tempUserData, callback);
//     });
//   });
// };

// // NEV configuration =====================
// nev.configure({
//   persistentUserModel: User,
//   expirationTime: 600, // 10 minutes

//   verificationURL: 'http://localhost:8000/email-verification/${URL}',
//   transportOptions: {
//     service: 'Gmail',
//     auth: {
//       user: 'listmidd@gmail.com',
//       pass: 'middlebury2017'
//     }
//   },

//   hashingFunction: myHasher,
//   passwordFieldName: 'pw',
// }, function(err, options) {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log('configured: ' + (typeof options === 'object'));
// });

// nev.generateTempUserModel(User, function(err, tempUserModel) {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log('generated temp user model: ' + (typeof tempUserModel === 'function'));
// });


// // Express stuff =========================
// app.use(bodyParser.urlencoded());
// app.get('/', function(req, res) {
//   console.log("email sent");
//   res.sendFile('index.html', {
//     root: __dirname
//   });
// });

// app.post('/', function(req, res) {
//   var email = req.body.email;

//   // register button was clicked
//   if (req.body.type === 'register') {
//     var pw = req.body.pw;
//     var newUser = new User({
//       email: email,
//       pw: pw
//     });

//     nev.createTempUser(newUser, function(err, existingPersistentUser, newTempUser) {
//       if (err) {
//         return res.status(404).send('ERROR: creating temp user FAILED');
//       }

//       // user already exists in persistent collection
//       if (existingPersistentUser) {
//         return res.json({
//           msg: 'You have already signed up and confirmed your account. Did you forget your password?'
//         });
//       }

//       // new user created
//       if (newTempUser) {
//         var URL = newTempUser[nev.options.URLFieldName];

//         nev.sendVerificationEmail(email, URL, function(err, info) {
//           if (err) {
//             return res.status(404).send('ERROR: sending verification email FAILED');
//           }
//           res.json({
//             msg: 'An email has been sent to you. Please check it to verify your account.',
//             info: info
//           });
//         });

//       // user already exists in temporary collection!
//       } else {
//         res.json({
//           msg: 'You have already signed up. Please check your email to verify your account.'
//         });
//       }
//     });

//   // resend verification button was clicked
//   } else {
//     nev.resendVerificationEmail(email, function(err, userFound) {
//       if (err) {
//         return res.status(404).send('ERROR: resending verification email FAILED');
//       }
//       if (userFound) {
//         res.json({
//           msg: 'An email has been sent to you, yet again. Please check it to verify your account.'
//         });
//       } else {
//         res.json({
//           msg: 'Your verification code has expired. Please sign up again.'
//         });
//       }
//     });
//   }
// });


// // user accesses the link that is sent
// app.get('/email-verification/:URL', function(req, res) {
//   var url = req.params.URL;

//   nev.confirmTempUser(url, function(err, user) {
//     if (user) {
//       nev.sendConfirmationEmail(user.email, function(err, info) {
//         if (err) {
//           return res.status(404).send('ERROR: sending confirmation email FAILED');
//         }
        

//         res.json({
//           msg: 'CONFIRMED!',
//           info: info
//         });
//       });
//     } else {
//       return res.status(404).send('ERROR: confirming temp user FAILED');
//     }
//   });
// });

// app.listen(8080);
// console.log('Express & NEV example listening on 8000...');
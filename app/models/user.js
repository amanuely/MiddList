
var mongoose=require('mongoose');
var titlize = require('mongoose-title-case');
var Schema = mongoose.Schema;
var bcrypt= require('bcrypt-nodejs');
var validate= require('mongoose-validator');




var userSchema = mongoose.Schema({
  email: String,
  pw: String,
});

// userSchema.methods.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.pw);
// };







// //------

// var nameValidator = [
//  validate({
//   validator: 'matches',
//   arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,
//   message:'No Special Character or numbers Must have space between name'
// })

// ];



// var emailValidator = [
// validate({
//   validator: 'isEmail',
//   message: 'Not a valid email'
// }),
// //
// validate({
//   validator: 'isLength',
//   arguments: [3, 50],
//   message: 'Email should be atleast 3 characters long'
// })
 
//  ];



// var passwordValidator = [
//  validate({
//   validator: 'matches',
//   arguments:   /^((?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W])).{8,40}$/,
//   //^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,

  
//   message:'password must be at least 8 characters, one symbol , 1 upper case'
// }),
// validate({
//   validator: 'isLength',
//   arguments: [3, 20],
//   message: 'Email should be atleast 3 characters long'
// })

// ];

// var UserSchema= new Schema({
//   name:{type:String, required:true},
//   email:{type:String,lowecase:true, required:true, unique:true},
//   password:{type:String, required:true,}
// });

// UserSchema.pre('save', function(next) {
// console.log("hashing");
//     var user= this;
//     bcrypt.hash(user.password, null, null, function(err, hash){
//       if (err) {
//         return next(err);
//       }
//       user.password=hash;
//       next();
//     });

  
// });

// UserSchema.plugin(titlize, {
//   //paths: [ 'firstname'], // Array of paths 
//   paths: [ 'name' ]
 
// });


// UserSchema.methods.comparePassword=function(password){
//   return bcrypt.compareSync(password, this.password);
// };






module.exports=mongoose.model('MiddList_persistent_Users',userSchema);
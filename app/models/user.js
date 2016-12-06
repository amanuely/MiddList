
var mongoose=require('mongoose');
var titlize = require('mongoose-title-case');
var Schema = mongoose.Schema;
var bcrypt= require('bcrypt-nodejs');
var validate= require('mongoose-validator');



var nameValidator = [
 validate({
  validator: 'matches',
  arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,
  message:'No Special Character or numbers Must have space between name'
})

];



var emailValidator = [
validate({
  validator: 'isEmail',
  message: 'Not a valid email'
}),
//
validate({
  validator: 'isLength',
  arguments: [3, 20],
  message: 'Email should be atleast 3 characters long'
})
 
 ];



var passwordValidator = [
 validate({
  validator: 'matches',
  arguments:   /^((?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W])).{8,40}$/,
  //^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,

  
  message:'password must be at least 8 characters, one symbol , 1 upper case'
}),
//  validate({
//   validator: 'matches',
//   arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,
//   message:'password does not match'
// }),
validate({
  validator: 'isLength',
  arguments: [3, 20],
  message: 'Email should be atleast 3 characters long'
})

];

var UserSchema= new Schema({
  name:{type:String, required:true, validate:nameValidator},
  email:{type:String,lowecase:true, required:true, unique:true,validate:emailValidator},
  password:{type:String, required:true, validate:passwordValidator}
});

UserSchema.pre('save', function(next) {

    var user= this;
    bcrypt.hash(user.password, null, null, function(err, hash){
      if (err) {
        return next(err);
      }
      user.password=hash;
      next();
    });

  
});

UserSchema.plugin(titlize, {
  //paths: [ 'firstname'], // Array of paths 
  paths: [ 'name' ]
 
});


UserSchema.methods.comparePassword=function(password){
  return bcrypt.compareSync(password, this.password);
};




//bcrypt.compareSync(myPlaintextPassword, hash);



// bcrypt.hash("bacon", null,null, function(err, hash) {
//   // Store hash in your password DB. 
// });

module.exports=mongoose.model('User',UserSchema);
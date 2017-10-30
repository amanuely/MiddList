
var mongoose=require('mongoose');
var titlize = require('mongoose-title-case');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var validate= require('mongoose-validator');

var userSchema = mongoose.Schema({
  email: String,
  pw: String,
});


userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.pw);
};


module.exports=mongoose.model('MiddList_persistent_Users',userSchema);

var mongoose=require('mongoose');
var Schema = mongoose.Schema;
var SellSchema= new Schema({
 title:  String,
  location: String,
  price: String,
  condition:   String,
   category:   String,
   email:   String,
   description:String

});
module.exports=mongoose.model('Sell',SellSchema);
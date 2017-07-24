var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
    
//net start MongoDB to start mongodb server
mongoose.connect('mongodb://127.0.0.1:27017');

var db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
  console.log('connected');
});

var drawerSchema = mongoose.Schema({
  name: String,
  content: Array
});

drawerSchema.methods.add = function(sentence){
  this.content.push(sentence);
}

drawerSchema.methods.replace = function(arr){
  this.content = arr;
}

var drawer = mongoose.model('drawer',drawerSchema);

exports.add_drawer = function(dname){
  return new drawer({name:dname});
}

exports.get_drawers = function(callback){
  drawer.find({},callback);
}

exports.rm_drawers = function(){
  return drawer.remove({});
}

var fontSchema = mongoose.Schema({
  family: String,
  src: String,
  format: String
})

var font = mongoose.model('font',fontSchema);

exports.add_font = function(fname,fsrc,fformat){
  return new font({family:fname,src:fsrc,format:fformat});
}

//callback is function(err,data)
exports.get_fonts = function(callback){
  font.find({},callback)
}

exports.rm_fonts = function(){
  return font.remove({});
}

exports.close = function(){mongoose.connection.close()}
exports.drawer = drawer;
exports.font = font;
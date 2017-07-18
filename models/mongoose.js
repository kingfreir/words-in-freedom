var mongoose = require('mongoose');

//net start MongoDB to start mongodb server
mongoose.connect('mongodb://localhost/test');

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
  console.log('sentence added: '+sentence);
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
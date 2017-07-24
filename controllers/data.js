var db = require('../models/mongoose.js')
var formidable = require('formidable')
var fs = require('fs')

exports.default = function(req,res){
  res.json({"status":"success"});
}

exports.upload = function(req,res){
  var form = formidable.IncomingForm();
  form.parse(req, function(err,fields,files){
    var oldpath = files.filetoupload.path;
    var newpath = '../files/' + files.filetoupload.name;
    fs.rename(oldpath,newpath,function(err){
      if(err) throw err;
      res.json({status:'success'});
      res.end()
    })
  })
}

exports.add = function(req,res){
  console.log(req.body.content)
  db.drawer.findOneAndUpdate(
    {name:'Your Words'},
    {$push:{content:req.body.content}},
    function(err,doc){
      if(err) throw err;
    }
  )
  res.json({'status':'success'})
}
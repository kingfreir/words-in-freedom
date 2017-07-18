var db = require('../models/mongoose.js')

exports.default = function(req,res){
  db.get_drawers(function(err,data){
    res.render('index',{title:'Manifesto Machine',categories:data})
  })
}
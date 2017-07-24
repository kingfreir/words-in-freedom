var db = require('../models/mongoose.js')
var async = require('async');

exports.default = function(req,res){
  async.parallel({
    categories:function(cb){db.get_drawers(cb)}
  },function(err,result){
    if(err) throw err;
    var data = result.categories;
    res.render('index',{title:'Manifesto Machine',categories:data})
  })
}
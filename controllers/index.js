var db = require('../models/mongoose.js')
var async = require('async');

exports.default = function(req,res){
  async.parallel({
    categories:function(cb){db.get_drawers(cb)},
    fonts:function(cb){db.get_fonts(cb)}
  },function(err,result){
    if(err) throw err;
    res.render('index',{
      title:'Manifesto Machine',
      categories:result.categories,
      fonts:result.fonts
    })
  })
}
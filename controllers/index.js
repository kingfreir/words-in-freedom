var db = require('../models/lowdb.js')
var async = require('async');
var config = require('../config.json')

exports.default = function(req,res){
  async.parallel({
    categories:function(cb){db.get_drawers(cb)},
    fonts:function(cb){db.get_fonts(cb)}
  },function(err,result){
    if(err) throw err;
    res.render('index',{
      title:'Manifesto Machine',
      categories:result.categories,
      fonts:result.fonts,
      useYourWords: config['use-your-words'],
    })
  })
}
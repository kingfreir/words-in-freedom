var db = require('../models/mongoose.js')

exports.default = function(req,res){
  //will probably replace with db function
  var db_result = get_drawers();
  res.render(index,{title:'Manifesto Machine',content:db_result})
}

function get_drawers(){

}
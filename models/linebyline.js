
var lbl = require('line-by-line');
var lr = new lbl('beginnings.txt');

lr.on('error',function(err){
  console.log(error);
});

var bgngs = new Array();

lr.on('line',function(line){
  bgngs.push(line);
});

lr.on('end',function(){
  console.log('finished reading beginnings');
  //begginings.replace(bgngs);
  begginings.save(function(err){
    if(err)return handleError(err);
  });
});

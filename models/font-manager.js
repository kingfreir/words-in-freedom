var fs = require('fs')
var sass = require('node-sass');
var db = require('./mongoose.js');

var font_faces = '';

fs.readdir('./public/fonts',function(err,files){
  files.forEach(function(file){
    var splice = file.split(".");
    var type;

    switch(splice[1]){
      case 'ttf': type='truetype';break;
      case 'otf':type='opentype';break;
      default: type=splice[1];
    }

    font_faces+="@font-face {\n font-family: "+splice[0]+";\n src: url('../fonts/"+file+"') format('"+type+"');\n }\n \n";
    
    db.add_font(splice[0],'../fonts/'+file,type)
      .save(function(err,drawer,n){
            if(err){ throw err;}
      });
  })

  setTimeout(function(){db.close()},1000);

  var yourPathTotheFile = './public/css/fonts.css';

  sass.render({
    data: font_faces,
    outFile: yourPathTotheFile,
  }, function(error, result) { // node-style callback from v3.0.0 onwards
    if(!error){
      // No errors during the compilation, write this result on the disk
      fs.writeFile(yourPathTotheFile, result.css, function(err){
        if(!err){
          //successfully generated css file
        }
      });
    }
  });
})


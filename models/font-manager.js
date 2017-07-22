var fs = require('fs')
var sass = require('node-sass');

var font_faces = '';

fs.readdir('./public/fonts',function(err,files){
  files.forEach(function(file){
    var splice = file.split(".");
    
    font_faces+="@font-face {\n font-family: "+splice[0]+";\n src: url('fonts/"+file+"') format('"+splice[1]+"');\n }\n \n";
  })

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


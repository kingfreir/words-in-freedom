var fs = require('fs')
var sass = require('node-sass')
var db = require('./lowdb.js')

var font_faces = ''

fs.readdir(__dirname + '/../../theme/fonts',function(err,files){
  files.forEach(function(file){
    var splice = file.split(".")
    var type

    switch(splice[1]){
      case 'ttf':
        type='truetype'
        break
      case 'otf':
        type='opentype'
        break
      default:
        type=splice[1]
    }

    font_faces += "@font-face {\n font-family: "+splice[0]+";\n src: url(fonts/"+file+"') format('"+type+"');\n }\n \n"
    
    //lowdb replace
    db.add_font({ family:splice[0], src: __dirname + '/../../fonts/'+file, format: type })
  })

  var yourPathTotheFile = __dirname + '/../../theme/fonts.css'

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


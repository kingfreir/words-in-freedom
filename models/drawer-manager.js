var db = require('./mongoose.js');
var fs = require('fs')
var readline = require('readline');

fs.readdir('./files',function(err,files){
    files.forEach(function(file){
        var newDrawer = db.add_drawer(file.split('.')[0]);
        readFile(file,newDrawer)
    })
})

function readFile(file,drawer){
    var rl = readline.createInterface({
        input: fs.createReadStream('./files/'+file)
    });
 
    rl.on('line', function (line) {
        //do something with line
        drawer.add(line);
    });

    rl.on('close',function(){
        drawer.save(function(err,drawer,n){
            if(err){ throw err;}
        });
    })
}

exports.readFile = readFile;
var db = require('./lowdb.js');
var fs = require('fs')
var readline = require('readline');

fs.readdir('./files',function(err,files){
    files.forEach(function(file){
        const dbName = file.split('.')[0]
        db.add_drawer(dbName)
        readFile(file,dbName)
    })
})

function readFile(file,drawer){
    var rl = readline.createInterface({
        input: fs.createReadStream('./files/'+file)
    });
 
    rl.on('line', function (line) {
        //do something with line
        db.add_line(drawer,line)
    });
}

exports.readFile = readFile;
var db = require('./lowdb.js')
var fs = require('fs')
var readline = require('readline')

fs.readdir(__dirname + '/../../files',(err,files) => {
    files.forEach((file) => {
        const dbName = file.split('.')[0]
        db.add_drawer(dbName)
        readFile(file,dbName)
    })
})

const readFile = (file,drawer) => {
    var rl = readline.createInterface({
        input: fs.createReadStream(__dirname + '/../../files/' + file)
    })
 
    rl.on('line', function (line) {
        //do something with line
        db.add_line(drawer,line)
    })
}

exports.readFile = readFile;
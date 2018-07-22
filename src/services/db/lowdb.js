const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync(__dirname + '/db.json')
const db = low(adapter)

db.defaults({ drawers: {}, fonts: []}).write()

exports.add_drawer = function(drawer) {
  db.get('drawers').set(drawer, { name: drawer, content: []}).write()
}

exports.add_line = function(drawer, line) {
  db.get('drawers').get(drawer).get('content').push(line).write()
}

exports.get_drawer = function(drawer) {
  db.get('drawers').get(drawer).value()
}

exports.get_drawers = function(cb) {
  cb(null, db.get('drawers').values().value())
}

exports.add_font = function(font) {
  db.get('fonts').push(font).write()
}

exports.get_fonts = function(cb) {
  cb(null,db.get('fonts').value())
}

exports.db = db
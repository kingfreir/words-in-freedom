const express = require('express');

var app = express();
var http = require('http').Server(app);

app.set('view engine','pug');

app.use(express.static(__dirname + "/public"));
app.use('/',require('./routes/index.js'))
app.use('/data',require('./routes/data.js'));

http.listen(3030, function(){
  console.log('listening on 3030');
});

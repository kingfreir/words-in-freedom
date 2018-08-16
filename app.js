const express = require('express');

var app = express();
var http = require('http').Server(app);

app.set('view engine','pug');
app.use(require('body-parser').json())

app.use(express.static(__dirname + "/public"));
app.use('/',require('./routes/index.js'))
app.use('/data',require('./routes/data.js'));

http.listen(8080, function(){
<<<<<<< HEAD
  console.log('listening on 8080');
=======
  console.log('listening on 3030');
>>>>>>> 8583a8a42538c31f92db48542ddf2c574a6d5f16
});

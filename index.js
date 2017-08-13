
var log = console.log.bind()
var path = require('path')
var express = require('express')
var app = express()
var db = require('./controllers/load-directory')

app.set('views', './views')
app.set('view engine', 'pug')

var staticPath = path.join(__dirname, 'static')
app.use('/static', express.static(staticPath))
app.use('/vendor',express.static('vendor'))

app.get('/', function(req, res) {
  // res.send('hello world')
  res.render('index', {
    uxDirList:db.list,
  })
})

app.listen(3000, function() {
  log('Running at http://localhost:3000')
})

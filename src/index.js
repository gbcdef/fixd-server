
var log = console.log.bind()

var path = require('path')
var express = require('express')
var loadDirectory = require('./load-directory')
var ipaddrs = require('./ipaddr')

// argv
var argv = require('yargs')
.usage('$0 [options]')
.options({
  port: {
    alias: 'p',
    describe: 'Server port.',
    type: 'number',
    default: 3456,
  },
}).help()
  .argv

var config = {
  docRoot: argv._[0],
}

var db = loadDirectory(config.docRoot)

var app = express()

app.set('views', path.resolve(__dirname, './views'))
app.set('view engine', 'pug')

// ixd docs
app.use('/',express.static(config.docRoot))

// bootstrap
app.use('/vendor',express.static(path.resolve(__dirname, 'vendor')))

app.get('/', function(req, res) {
  // res.send('hello world')
  res.render('index', {
    uxDirList:db,
  })
})

app.listen(argv.port, function() {
  log('Running file server at:')
  log('http://127.0.0.1:' + argv.p)
  for (var ip of ipaddrs){
    log('http://' + ip + ':' + argv.p)

  }
})

var log = console.log.bind()

var path = require('path')
var express = require('express')
var loadDirectory = require('./load-directory')
var ipaddrs = require('./ipaddr')
var vlog = require('./vlog')

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
    verbose: {
      alias: 'v',
      describe: 'Verbose mode.',
      type: 'boolean',
      default: false,
    },
  }).help()
  .argv

var config = {
  docRoot: argv._[0],
  port: argv.port,
  isVerbose: argv.verbose,
}

if (config.docRoot === undefined) config.docRoot = path.resolve('./')

var app = express()

app.set('views', path.resolve(__dirname, './views'))
app.set('view engine', 'pug')

// 文档目录所在地址
app.use('/', express.static(config.docRoot))

// bootstrap
app.use('/vendor', express.static(path.resolve(__dirname, 'vendor')))

app.get('/', function (req, res) {
  vlog(config.isVerbose, req)
  var db = loadDirectory(config.docRoot)
  res.render('index', {
    uxDirList: db,
    currentDir: '/' + path.basename(config.docRoot),
  })
})

// 收藏夹图标
app.get('/favicon.ico', function (req, res) {
  res.sendFile(path.join(__dirname, 'favicon.ico'))
})

// recursively router, 
app.get('/:folder*', function (req, res) {
  vlog(config.isVerbose, req)
  var subDir = path.join(config.docRoot, req.params.folder, req.params['0'])
  var uiSubDir = path.join(path.basename(config.docRoot), req.params.folder, req.params['0'])

  // cover '/robots.txt' etc.
  try {
    var db = loadDirectory(subDir)
    res.render('index', {
      uxDirList: db,
      currentDir: '/' + uiSubDir,
    })
  } catch (err) {
    res.send('404 Not Found')
  }

})

app.listen(config.port, function () {
  log('Running file server at:')
  log('http://127.0.0.1:' + config.port)
  for (var ip of ipaddrs) {
    log('http://' + ip + ':' + config.port)

  }
  log('===')
})
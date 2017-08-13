var log = console.log.bind()
var fs = require('fs')
var path = require('path')

function loadDirectory(target) {

  target = target != undefined
    ? target
    : '../static'
  var targetPath = path.resolve(__dirname, target)
  var uxDirList = []

  dirs = fs.readdirSync(targetPath)

  for (dir of dirs) {
    d = path.join(targetPath, dir)
    var stats = fs.statSync(d)

    if (stats.isDirectory()) {
      var sub = fs.readdirSync(d)
      if (sub.includes('index.html')) {
        uxDirList.push({
          dir: d,
          basename: path.basename(d),
          link: path.join(path.relative(__dirname, d),'index.html'),
          time: stats.mtime,
          timeStr: stats.mtime.toLocaleString(),
        })
      }
    }
  }
  uxDirList.sort((a, b) => {
    return b.time - a.time
  })
  // log(uxDirList)
  return uxDirList
}

module.exports = {
  list: loadDirectory()
}

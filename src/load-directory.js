var log = console.log.bind()
var fs = require('fs')
var path = require('path')

module.exports = function loadDirectory(target) {

  if(target == undefined) return []

  var targetPath = path.resolve( target)
  var uxDirList = []

  var dirs = fs.readdirSync(targetPath)

  for (var dir of dirs) {
    var d = path.join(targetPath, dir)
    var stats = fs.statSync(d)

    if (stats.isDirectory()) {
      var sub = fs.readdirSync(d)
      if (sub.includes('index.html')) {
        uxDirList.push({
          dir: d,
          basename: path.basename(d),
          link: path.join(path.relative(target, d),'index.html'),
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

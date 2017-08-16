var log = console.log.bind()
var fs = require('fs')
var path = require('path')

module.exports = function loadDirectory(target) {
    if (target === undefined) return []
    var itemList = []
    var dirs = fs.readdirSync(target)
    for (var dir of dirs) {
        var d = path.resolve(target, dir)
        itemList.push(calcItem(dir, target))
    }
    itemList.sort((a, b) => {
        return b.time - a.time
    })
    return itemList
}

function getPathType(dir, stats) {
    // type: dir_html,dir_normal, file
    if (stats.isDirectory()) {
      var subs = fs.readdirSync(dir)
      return subs.includes('index.html') ? 'dir_html' : 'dir_normal'
    } else {
      return 'file'
    }
}

function calcItem(dir, target) {
    var d = dir
    var stats = fs.statSync(d)
    var item = {
        dir: d,
        basename: path.basename(d),
        mtime: stats.mtime,
        ctime: stats.ctime,
        atime: stats.atime,
        type: getPathType(d, stats),
    }
    // remaining: customize sorting orders
    item.time = item.mtime
    item.timeStr = item.time.toLocaleString()

    if (item.type == 'dir_html') {
        item.link = path.join(path.relative(target, d), 'index.html')
    } else if (item.type == 'dir_normal') {
        item.link = '#'
    } else {
        item.link = path.relative(target, d)
    }
    return item
}
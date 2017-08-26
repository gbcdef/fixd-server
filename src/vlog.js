module.exports = function vlog(bool, req){	
  if (bool) {
    console.log([
      new Date(),
      req.ip,
      req.method,
      req.url
    ].join(' '))
  }
}
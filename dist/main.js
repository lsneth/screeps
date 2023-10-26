const mainSpawn = require('./main.spawn')
const mainActions = require('./main.actions')
const mainCleanup = require('./main.cleanup')

module.exports.loop = function () {
  // spawn creep(s)
  mainSpawn()

  // creep actions
  mainActions()

  // cleanup function
  mainCleanup()
}

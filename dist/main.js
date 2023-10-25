const mainSpawn = require('mainSpawn')
const mainActions = require('mainActions')
const mainCleanup = require('mainCleanup')

module.exports.loop = function () {
  // spawn creep(s)
  mainSpawn()

  // creep actions
  mainActions()

  // cleanup function
  mainCleanup()
}

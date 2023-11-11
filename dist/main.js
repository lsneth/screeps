const mainSpawn = require('./main.spawn')
const mainActions = require('./main.actions')
const mainCleanup = require('./main.cleanup')
const setupRoomMemory = require('./setupRoomMemory')

module.exports.loop = function () {
  // setup room memory
  setupRoomMemory(Game.spawns['Spawn1'].room)

  // spawn creep(s)
  mainSpawn()

  // creep actions
  // mainActions()
  // cleanup function
  // mainCleanup()
}

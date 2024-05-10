// prototype edits
require('./extensions.creep')

const setUpRooms = require('./setUpRooms')
const spawnCreeps = require('./spawn')
const creepActions = require('./actions')
const cleanUp = require('./cleanUp')

module.exports.loop = function () {
  setUpRooms()
  spawnCreeps()
  creepActions()
  cleanUp()
}

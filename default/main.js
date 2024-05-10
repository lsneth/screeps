// prototype edits
require('./extensions.creep')

const spawnCreeps = require('./spawn')
const creepActions = require('./actions')
// const mainCleanup = require('./main.cleanup')

module.exports.loop = function () {
  spawnCreeps()
  creepActions()
  // // cleanup function
  // mainCleanup()
}

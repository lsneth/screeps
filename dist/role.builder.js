const { buildCodes } = require('./utils.resultCodes')
const collect = require('./action.collect')

function build(creep) {
  // if the creep has energy in its store
  if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
    const constructionSite = creep.room.find(FIND_MY_CONSTRUCTION_SITES)[0]

    const result = creep.build(constructionSite)
    switch (result) {
      case OK:
        break

      case ERR_INVALID_TARGET:
        creep.moveTo(Game.flags['camp'])
        break

      case ERR_NOT_IN_RANGE:
        creep.moveTo(constructionSite)
        break

      default:
        Game.notify(`${buildCodes[-result]}`)
        console.log(`${buildCodes[-result]}`)
        break
    }
  }
  // if the creep has no energy in its store
  else {
    collect(creep)
  }
}

module.exports = build

const harvestAction = require('./action.harvest')

function build(creep) {
  const constructionSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES)
  if (constructionSites.length === 0) return
  if (creep.store[RESOURCE_ENERGY] === 0) {
    harvestAction({ creep, postHarvestAction: () => build(creep) })
  } else {
    if (creep.build(constructionSites[0]) === ERR_NOT_IN_RANGE) {
      creep.moveTo(constructionSites[0])
    }
  }
}

function builder(creep) {
  if (creep.memory.harvesting === true) {
    harvestAction({ creep, postHarvestAction: () => build(creep) })
  } else {
    build(creep)
  }
}

module.exports = builder

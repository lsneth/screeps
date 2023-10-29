const { harvestCodes } = require('./utils.resultCodes')

// harvest energy from an energy source
function harvestAction({ creep, postHarvestAction }) {
  // if creep's store is full
  if (creep.store.getFreeCapacity() === 0) {
    // set harvesting to false and do the post harvest action
    creep.memory.harvesting = false
    postHarvestAction(creep)
    return
  }
  // if creep's store is not full
  else {
    // set harvesting mode to true, this is usually only relevant when harvestAction is first called
    creep.memory.harvesting = true
  }

  // find nearest active energy source
  let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE)
  if (!source) {
    creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE)
  }

  // harvest the source
  const harvestResult = creep.harvest(source)
  if (
    harvestResult === OK ||
    harvestResult === ERR_BUSY || // creep still spawning
    harvestResult === ERR_INVALID_TARGET // all energy sources are blocked
  ) {
    return
  } else if (harvestResult === ERR_NOT_IN_RANGE) {
    creep.moveTo(source)
  } else {
    Game.notify(`${creep.memory.role} ${harvestCodes[Math.abs(harvestResult)]}`)
    console.log(`${creep.memory.role} ${harvestCodes[Math.abs(harvestResult)]}${creep.name}`)
  }
}

module.exports = harvestAction

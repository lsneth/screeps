const { harvestCodes } = require('./utils.resultCodes')

// harvest energy from an energy source
function harvest({ creep, postHarvestAction }) {
  // if creep's store is full, set harvesting to false and start transferring
  // TODO: figure out why creep is often undefined here
  if (creep.store.getFreeCapacity() === 0) {
    creep.memory.harvesting = false
    return postHarvestAction(creep)
  }

  // find nearest energy source
  let source = creep.pos.findClosestByPath(FIND_SOURCES)
  if (!source) {
    creep.pos.findClosestByRange(FIND_SOURCES)
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
    console.log(`${creep.memory.role} ${harvestCodes[Math.abs(harvestResult)]}`)
  }
}

module.exports = harvest

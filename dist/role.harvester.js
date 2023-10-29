const { transferCodes } = require('./utils.resultCodes')
const harvestAction = require('./action.harvest')

// transfer energy into an extension or spawn
function transfer(creep) {
  // if creep's store is empty, switch to harvesting mode and harvest
  if (creep.store.getFreeCapacity() === creep.store.getCapacity()) {
    harvestAction({ creep, postHarvestAction: () => transfer(creep) })
    return
  }

  // closest spawn
  let closestSpawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS)
  if (!closestSpawn) {
    closestSpawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS)
  }

  // closest extension that isn't full
  const closestExtension = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: (structure) =>
      structure.structureType === STRUCTURE_EXTENSION &&
      structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 &&
      structure.hits > 0,
  })

  // determine what energy store to transfer to, extensions take priority because they don't create their own
  const energyStore = closestExtension ? closestExtension : closestSpawn

  const transferResult = creep.transfer(energyStore, RESOURCE_ENERGY)
  // if it's full, just wait
  // TODO: maybe it should move on when the store is full?
  if (transferResult === OK || transferResult === ERR_FULL) {
    return
  } else if (transferResult === ERR_NOT_IN_RANGE) {
    creep.moveTo(energyStore)
  } else {
    Game.notify(`${transferCodes[Math.abs(transferResult)]}`)
    console.log(`${transferCodes[Math.abs(transferResult)]}`)
  }
}

function harvester(creep) {
  // if creep is in harvesting mode, collect energy from sources
  if (creep.memory.harvesting) {
    harvestAction({ creep, postHarvestAction: () => transfer(creep) })
  }
  // if creep is not in harvesting mode, transfer energy to extension or spawn
  else {
    transfer(creep)
  }
}
module.exports = harvester

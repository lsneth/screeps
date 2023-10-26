const resultCodes = require('./utils.resultCodes')

// harvest energy from an energy source
function harvest(creep) {
  // if creep's store is full, set harvesting to false and start transferring
  if (creep.store.getFreeCapacity() == 0) {
    creep.memory.harvesting = false
    return transfer(creep)
  }

  let source = creep.pos.findClosestByPath(FIND_SOURCES)
  if (!source) {
    creep.pos.findClosestByRange(FIND_SOURCES)
  }

  const harvestResult = creep.harvest(source)
  // ERR_BUSY is when they're still being spawned
  if (harvestResult === OK || harvestResult === ERR_BUSY) {
    return
  } else if (harvestResult === ERR_NOT_IN_RANGE) {
    creep.moveTo(source)
  } else {
    Game.notify(`Harvester harvest error: ${harvestResult}`)
    console.log(`Harvester harvest error: ${harvestResult}. Creep: ${creep}. Source: ${source}.`)
  }
}

// transfer energy into an extension or spawn
function transfer(creep) {
  // if creep's store is empty, set harvesting to true and start harvesting
  if (creep.store.getFreeCapacity() === creep.store.getCapacity()) {
    creep.memory.harvesting = true
    return harvest(creep)
  }

  let closestSpawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS)

  if (!closestSpawn) {
    closestSpawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS)
  }

  // closest extension that isn't full
  const closestExtension = creep.pos.findClosestByPath(FIND_STRUCTURES, {
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
    Game.notify('Harvester transfer error: ', transferResult)
    console.log('Harvester transfer error: ', transferResult)
  }
}

function harvester(creep) {
  // if creep is in harvesting mode, collect energy from sources
  if (creep.memory.harvesting) {
    harvest(creep)
  }
  // if creep is not in harvesting mode, transfer energy to extension or spawn
  else {
    transfer(creep)
  }
}

module.exports = harvester

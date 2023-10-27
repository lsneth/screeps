const { harvestCodes, transferCodes } = require('./utils.resultCodes')

// harvest energy from an energy source
function harvest(creep) {
  // if creep's store is full, set harvesting to false and start transferring
  if (creep.store.getFreeCapacity() == 0) {
    creep.memory.destinationId = null
    creep.memory.harvesting = false
    return transfer(creep)
  }

  if (!creep.memory.destinationId) {
    const closestSource = creep.pos.findClosestByPath(FIND_SOURCES)
    creep.memory.destinationId = closestSource ? closestSource.id : creep.pos.findClosestByRange(FIND_SOURCES).id
  }
  const destination = Game.getObjectById(creep.memory.destinationId)

  const harvestResult = creep.harvest(destination)
  // ERR_BUSY is when they're still being spawned
  if (harvestResult === OK || harvestResult === ERR_BUSY) {
    return
  } else if (harvestResult === ERR_NOT_IN_RANGE) {
    creep.moveTo(destination)
  } else if (harvestResult === ERR_INVALID_TARGET) {
    creep.moveTo(destination)
  } else {
    Game.notify(`${harvestCodes[Math.abs(harvestResult)]}`)
    console.log(`${harvestCodes[Math.abs(harvestResult)]}`)
  }
}

// transfer energy into an extension or spawn
function transfer(creep) {
  // if creep's store is empty, switch to harvesting mode and harvest
  if (creep.store.getFreeCapacity() === creep.store.getCapacity()) {
    creep.memory.destinationId = null
    creep.memory.harvesting = true
    return harvest(creep)
  }

  // determine what energy store to transfer to, extensions take priority because they don't create their own energy
  if (!creep.memory.destinationId) {
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

    creep.memory.destinationId = closestExtension ? closestExtension.id : closestSpawn.id
  }

  const destination = Game.getObjectById(creep.memory.destinationId)

  const transferResult = creep.transfer(destination, RESOURCE_ENERGY)
  // if it's full, just wait // TODO: maybe it should move on when the store is full?
  if (transferResult === OK || transferResult === ERR_FULL) {
    return
  } else if (transferResult === ERR_NOT_IN_RANGE) {
    creep.moveTo(destination)
  } else {
    Game.notify(`${transferCodes[Math.abs(transferResult)]}`)
    console.log(transferCodes[Math.abs(transferResult)])
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

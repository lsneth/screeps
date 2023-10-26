// harvest energy from an energy source
function harvest(creep) {
  // if creep's store is full, set harvesting to false and start transferring
  if (creep.store.getFreeCapacity() == 0) {
    creep.memory.harvesting = false
    return transfer(creep)
  }

  const sources = creep.room.find(FIND_SOURCES_ACTIVE)

  const harvestResult = creep.harvest(sources[0])
  if (harvestResult === OK) {
    return
  } else if (harvestResult === ERR_NOT_IN_RANGE) {
    creep.moveTo(sources[0])
  } else {
    Game.notify('Harvester harvest error: ', harvestResult)
    console.log('Harvester harvest error: ', harvestResult)
  }
}

// transfer energy into an extension or spawn
function transfer(creep) {
  // if creep's store is empty, set harvesting to true and start harvesting
  if (creep.store.getFreeCapacity() === creep.store.getCapacity()) {
    creep.memory.harvesting = true
    return harvest(creep)
  }

  // array of all spawns
  const spawns = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) =>
      structure.structureType === STRUCTURE_SPAWN && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
  })
  // array of all extensions
  const extensions = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) =>
      structure.structureType === STRUCTURE_EXTENSION &&
      structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 &&
      structure.hits > 0,
  })

  // determine what energy store to transfer to, extensions take priority because they don't create their own
  const energyStore = extensions.length > 0 ? extensions[0] : spawns[0]

  const transferResult = creep.transfer(energyStore, RESOURCE_ENERGY)
  if (transferResult === OK) {
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

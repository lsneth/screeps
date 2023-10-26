function upgrader(creep) {
  const sources = creep.room.find(FIND_SOURCES)
  if (creep.memory.upgrading === true) {
    if (creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.upgrading = false
      if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1])
      }
    } else {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller)
      }
    }
  } else {
    if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
      creep.moveTo(sources[1])
    } else if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()) {
      creep.memory.upgrading = true
    }
  }
}

module.exports = upgrader

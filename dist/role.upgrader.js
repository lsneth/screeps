function upgrader(creep) {
  let source = creep.pos.findClosestByPath(FIND_SOURCES)
  if (!source) {
    creep.pos.findClosestByRange(FIND_SOURCES)
  }

  if (creep.memory.upgrading === true) {
    if (creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.upgrading = false
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source)
      }
    } else {
      const upgradeResult = creep.upgradeController(creep.room.controller)
      if (upgradeResult === OK) {
        return
      } else if (upgradeResult === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller)
      } else {
        Game.notify('Harvester harvest error: ', harvestResult)
        console.log('Harvester harvest error: ', harvestResult)
      }
    }
  } else {
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source)
    } else if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()) {
      creep.memory.upgrading = true
    }
  }
}

module.exports = upgrader

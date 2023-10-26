function builder(creep) {
  // TODO: remove after roads are built around bottom source
  const source = creep.room.find(FIND_SOURCES)[0]
  // let source = creep.pos.findClosestByPath(FIND_SOURCES) // TODO: FIND_SOURCES_ACTIVE?
  // if (!source) {
  //   creep.pos.findClosestByRange(FIND_SOURCES)
  // }

  if (creep.memory.building === true) {
    const constructionSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES)
    if (constructionSites.length === 0) return
    if (creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.building = false
      if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
        creep.moveTo(source)
      }
    } else {
      if (creep.build(constructionSites[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(constructionSites[0])
      }
    }
  } else {
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
      creep.moveTo(source)
    } else if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()) {
      creep.memory.building = true
    }
  }
}

module.exports = builder

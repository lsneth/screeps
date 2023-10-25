const roleBuilder = {
  /** @param {Creep} creep **/
  run: function (creep) {
    const sources = creep.room.find(FIND_SOURCES)
    if (creep.memory.building === true) {
      const constructionSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES)
      if (constructionSites.length === 0) return
      if (creep.store[RESOURCE_ENERGY] === 0) {
        creep.memory.building = false
        if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[1])
        }
      } else {
        if (creep.build(constructionSites[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(constructionSites[0])
        }
      }
    } else {
      if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[1])
      } else if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()) {
        creep.memory.building = true
      }
    }
  },
}

module.exports = roleBuilder

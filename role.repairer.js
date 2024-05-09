// TODO: save to memory the most common creep positions with roads. Make those roads a higher priority
const { repairCodes } = require('./utils.resultCodes')
const collect = require('./action.collect')

function repairAction(creep) {
  // if there is nothing to repair
  if (creep.memory.repairsPriority.length === 0) {
    // go to camp, don't clog up the energy sources or paths
    creep.moveTo(Game.flags['camp'])
  }
  // if there are things to repair
  else {
    // remove from memory any sites that have been fully repaired
    creep.memory.repairsPriority = creep.memory.repairsPriority.filter(
      (repairSiteId) => Game.getObjectById(repairSiteId).hits < Game.getObjectById(repairSiteId).hitsMax
    )

    // find the closest repair site of the top 4 most damaged structures
    const closestRepairSite = creep.pos.findClosestByPath(
      creep.memory.repairsPriority.slice(0, 4).map((repairSite) => Game.getObjectById(repairSite))
    )

    const result = creep.repair(closestRepairSite)
    switch (result) {
      case OK:
        break

      case ERR_NOT_IN_RANGE:
        creep.moveTo(closestRepairSite)
        break

      default:
        Game.notify(`${repairCodes[-result]}`)
        console.log(`${repairCodes[-result]}`)
        break
    }
  }
}

function repair(creep) {
  // update repairsPriority every 100 ticks (or if it's a brand new repairer creep)
  if (Game.time % 100 === 0 || !creep.memory.repairsPriority) {
    // find damaged structures
    const repairSites = creep.room
      .find(FIND_STRUCTURES, {
        filter: (structure) =>
          structure.hits < structure.hitsMax &&
          // filter out walls and ramparts
          structure.structureType !== STRUCTURE_RAMPART &&
          structure.structureType !== STRUCTURE_WALL,
      })

      // sort the repair sites in order from most damage to least damage (by percentage)
      .sort(function (a, b) {
        return a.hits / a.hitsMax - b.hits / b.hitsMax
      })

    // save the ids to the creep's memory
    creep.memory.repairsPriority = repairSites.map((repairSite) => repairSite.id)
  }

  // if the creep has energy in its store
  if (creep.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
    repairAction(creep)
  }
  // if creep is not in harvesting mode
  else {
    collect(creep)
  }
}

module.exports = repair

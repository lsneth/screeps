// TODO: save to memory the most common creep positions with roads. Make those roads a higher priority
const { repairCodes } = require('./utils.resultCodes')
const harvestAction = require('./action.harvest')

function repairAction(creep) {
  // if there is nothing to repair
  if (creep.memory.repairsPriority.length === 0) {
    // go to camp, don't clog up the energy sources or paths
    creep.moveTo(Game.flags.repairerCamp)
    creep.say('camping')
  }
  // if there are things to repair
  else {
    // if the creep is out of energy in its store
    if (creep.store[RESOURCE_ENERGY] === 0) {
      // start harvesting
      harvestAction({ creep, postHarvestAction: () => repairAction(creep) })
      return
    }
    // if the creep still has energy in its store
    else {
      // remove from memory any sites that have been fully repaired
      creep.memory.repairsPriority = creep.memory.repairsPriority.filter(
        (repairSiteId) => Game.getObjectById(repairSiteId).hits < Game.getObjectById(repairSiteId).hitsMax
      )

      // TODO: find the closest repair site of the top 5 in repairsPriority
      // const closestRepairSite = creep.pos.findClosestByPath(
      //   creep.memory.repairsPriority.slice(0, 6).map((repairSite) => Game.getObjectById(repairSite))
      // )
      const closestRepairSite = Game.getObjectById(creep.memory.repairsPriority[0])

      const repairResult = creep.repair(closestRepairSite)
      if (repairResult === OK) return
      else if (repairResult === ERR_NOT_IN_RANGE) {
        creep.say(`${closestRepairSite.pos.x}, ${closestRepairSite.pos.y}`)
        creep.moveTo(closestRepairSite)
      } else {
        Game.notify(`${repairCodes[Math.abs(repairResult)]}`)
        console.log(`${repairCodes[Math.abs(repairResult)]}`)
      }
    }
  }
}

function repairer(creep) {
  // temp test to see how many roads are destroyed from lack of repairs
  const roads = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => structure.structureType === STRUCTURE_ROAD && structure.hits === 1,
  })
  if (roads.length) {
    Game.notify(`a road was destroyed ${roads[0].id}: ${roads[0].pos.x}, ${roads[0].pos.y}`)
    console.log(`a road was destroyed ${roads[0].id}: ${roads[0].pos.x}, ${roads[0].pos.y}`)
  }

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

  // if creep is in harvesting mode
  if (creep.memory.harvesting) {
    harvestAction({ creep, postHarvestAction: () => repairAction(creep) })
  }
  // if creep is not in harvesting mode
  else {
    repairAction(creep)
  }
}

module.exports = repairer

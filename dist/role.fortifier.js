// // TODO: save to memory the most common creep positions with roads. Make those roads a higher priority
// const { repairCodes } = require('./utils.resultCodes')
// const harvestAction = require('./action.harvest')

// function repairAction(creep) {
//   // if there is nothing to repair
//   if (creep.memory.fortifyPriority.length === 0) {
//     // go to camp, don't clog up the energy sources or paths
//     creep.moveTo(Game.flags.repairerCamp)
//     creep.say('camping')
//   }
//   // if there are things to repair
//   else {
//     // if the creep is out of energy in its store
//     if (creep.store[RESOURCE_ENERGY] === 0) {
//       // start harvesting
//       harvestAction({ creep, postHarvestAction: () => repairAction(creep) })
//       return
//     }
//     // if the creep still has energy in its store
//     else {
//       // remove from memory any sites that have been fully repaired
//       creep.memory.fortifyPriority = creep.memory.fortifyPriority.filter(
//         (repairSiteId) => Game.getObjectById(repairSiteId).hits < Game.getObjectById(repairSiteId).hitsMax
//       )

//       const closestRepairSite = creep.pos.findClosestByPath(
//         creep.memory.fortifyPriority.slice(0, 4).map((fortifySite) => Game.getObjectById(fortifySite))
//       )
//       // const closestRepairSite = Game.getObjectById(creep.memory.fortifyPriority[0])

//       const repairResult = creep.repair(closestRepairSite)
//       if (repairResult === OK) return
//       else if (repairResult === ERR_NOT_IN_RANGE) {
//         creep.say(`${closestRepairSite.pos.x}, ${closestRepairSite.pos.y}`)
//         creep.moveTo(closestRepairSite)
//       } else {
//         Game.notify(`${repairCodes[Math.abs(repairResult)]}`)
//         console.log(`${repairCodes[Math.abs(repairResult)]}`)
//       }
//     }
//   }
// }

// function fortifier(creep) {
//   // update fortifyPriority every 100 ticks (or if it's a brand new fortifier creep)
//   if (Game.time % 100 === 0 || !creep.memory.fortifyPriority) {
//     // find damaged structures
//     const fortifySites = creep.room
//       .find(FIND_STRUCTURES, {
//         filter: (structure) =>
//           (structure.hits < structure.hitsMax &&
//             // filter out walls and ramparts
//             structure.structureType === STRUCTURE_RAMPART) ||
//           structure.structureType === STRUCTURE_WALL,
//       })
//       // sort the repair sites in order from most damage to least damage (by percentage)
//       .sort(function (a, b) {
//         return a.hits / a.hitsMax - b.hits / b.hitsMax
//       })

//     // save the ids to the creep's memory
//     creep.memory.fortifyPriority = fortifySites.map((fortifySite) => fortifySite.id)
//   }

//   // if creep is in harvesting mode
//   if (creep.memory.harvesting) {
//     harvestAction({ creep, postHarvestAction: () => repairAction(creep) })
//   }
//   // if creep is not in harvesting mode
//   else {
//     repairAction(creep)
//   }
// }

// module.exports = fortifier

// const roleRoadRepairer = {
//   /** @param {Creep} creep **/
//   run: function (creep) {
//     const sources = creep.room.find(FIND_SOURCES)
//     if (creep.memory.repairing === true) {
//       const repairSites = creep.room.find(FIND_MY_STRUCTURES, {
//         filter: function (object) {
//           return object.hits < object.hitsMax
//         },
//       })
//       if (repairSites.length === 0) return
//       if (creep.store[RESOURCE_ENERGY] === 0) {
//         creep.memory.repairing = false
//         if (creep.harvest(sources[1]) === ERR_NOT_IN_RANGE) {
//           creep.moveTo(sources[1])
//         }
//       } else {
//         if (creep.repair(repairSites[0]) == ERR_NOT_IN_RANGE) {
//           creep.moveTo(repairSites[0])
//         }
//       }
//     } else {
//       if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
//         creep.moveTo(sources[1])
//       } else if (creep.store[RESOURCE_ENERGY] === creep.store.getCapacity()) {
//         creep.memory.repairing = true
//       }
//     }
//   },
// }

// module.exports = roleRoadRepairer

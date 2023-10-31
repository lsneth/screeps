const { transferCodes } = require('./utils.resultCodes')

// TODO: figure out how to go to the harvesters that are never the closest
// transport energy from harvesters to an extension or spawn
function transport(creep) {
  // if creep's store isn't full
  if (creep.store.getUsedCapacity() <= 0) {
    // move towards a harvester. when the transporter gets there, the harvester will fill it with energy.
    creep.moveTo(
      creep.pos.findClosestByPath(FIND_MY_CREEPS, {
        filter: (creep) =>
          creep.memory.role === 'harvester' && creep.store.getUsedCapacity() / creep.store.getCapacity() >= 0.1,
      })
    )
  }
  // if creep has store is full
  else {
    // the closest extension if there is one available, else the closest spawn
    const closestStore =
      creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (structure) => structure.structureType === STRUCTURE_EXTENSION && structure.store.getFreeCapacity() > 0,
      }) || creep.pos.findClosestByPath(FIND_MY_SPAWNS)

    // attempt to transfer energy to closestStore
    const transferResult = creep.transfer(closestStore, RESOURCE_ENERGY)
    switch (transferResult) {
      case OK:
      case ERR_BUSY: // creep is still spawning
        break

      case ERR_NOT_IN_RANGE:
        creep.moveTo(closestStore)
        break

      default:
        Game.notify(`${transferCodes[Math.abs(transferResult)]}`)
        console.log(`${transferCodes[Math.abs(transferResult)]}`)
        break
    }
  }
}

module.exports = transport

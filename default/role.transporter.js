// TODO: don't make a trip unless the creep is full or empty, not somewhere in between
// TODO: handle case where the all accesses to a source are blocked and we get error: transfer result: ERR_INVALID_TARGET, The target is not a valid object which can contain the specified resource., transporter781, target: null
const collect = require('./action.collect')
const { transferCodes } = require('./utils.resultCodes')

// transport energy from harvesters to an extension or spawn
function transport(creep) {
  // if all stores in the room are full AND the creep's store is full
  if (
    creep.room.energyAvailable === creep.room.energyCapacityAvailable &&
    creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0
  ) {
    creep.moveTo(Game.flags.camp)
  }
  // if not all stores in the room are full
  else {
    // if the creep has space left in its store
    if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      collect(creep)
    }
    // if the creep does not have space left in its store
    else {
      let closestStore =
        creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
          filter: (structure) =>
            structure.structureType === STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
        }) || creep.pos.findClosestByPath(FIND_MY_SPAWNS)
      // sometimes when a creep's path is blocked, the above will return null. this is the backup to make sure `closestStore` is defined.
      if (!closestStore) {
        closestStore =
          creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (structure) =>
              structure.structureType === STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
          }) || creep.pos.findClosestByPath(FIND_MY_SPAWNS)
      }

      // attempt to transfer energy to closestStore
      const result = creep.transfer(closestStore, RESOURCE_ENERGY)
      switch (result) {
        case OK:
          break

        case ERR_NOT_IN_RANGE:
          creep.moveTo(closestStore)
          break

        default:
          Game.notify(`${transferCodes[-result]}, ${creep.name}`)
          console.log(`${transferCodes[-result]}, ${creep.name}, target: ${closestStore}`)
          break
      }
    }
  }
}

module.exports = transport

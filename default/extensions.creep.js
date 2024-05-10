const { harvestCodes } = require('./utils.resultCodes')
const { transferCodes } = require('./utils.resultCodes')

Creep.prototype.harvestAndTransfer = function () {
  // harvest
  if (this.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    const source = this.pos.findClosestByPath(FIND_SOURCES)

    const result = this.harvest(source)
    switch (result) {
      case OK:
        break

      case ERR_NOT_IN_RANGE:
        this.moveTo(source)
        break

      default:
        console.log(
          `${this.memory.role} ${harvestCodes[-result]}, ${this.name}, ${this.id}, (${(this.pos.x, this.pos.y)})`
        )
        break
    }
  }

  // transfer
  const adjacentCreeps = this.pos.findInRange(FIND_MY_CREEPS, 1, {
    filter: (c) => c.id !== this.id && c.memory.role !== 'harvester',
  })
  if (adjacentCreeps.length > 0) {
    this.transfer(adjacentCreeps[0], RESOURCE_ENERGY)
  }
}

Creep.prototype.collectAndCarry = function () {
  // TODO: don't make a trip unless the creep is full or empty, not somewhere in between
  // TODO: handle case where the all accesses to a source are blocked and we get error: transfer result: ERR_INVALID_TARGET, The target is not a valid object which can contain the specified resource., carrier781, target: null
  // if all stores in the room are full AND the creep's store is full
  if (
    this.room.energyAvailable === this.room.energyCapacityAvailable &&
    this.store.getFreeCapacity(RESOURCE_ENERGY) === 0
  ) {
    this.moveTo(Game.flags.camp)
  } else {
    // if the creep has space left in its store
    if (this.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
      // TODO: figure out how to go to the harvesters that are never the closest
      // TODO: figure out how to get rid of the extra tick after the creep is filled with energy
      // move towards a harvester. when the creep gets there, the harvester will fill it with energy.
      const closestHarvester = this.pos.findClosestByPath(FIND_MY_CREEPS, {
        filter: (c) =>
          c.memory.role === 'harvester' &&
          c.store.getUsedCapacity(RESOURCE_ENERGY) / c.store.getCapacity(RESOURCE_ENERGY) > 0.33, // this 33% is arbitrary for now. It helps creeps get around to all harvesters and not ignore the ones that are just a bit further than others.
      })
      this.moveTo(closestHarvester)
    }
    // if the creep does not have space left in its store
    else {
      let closestStore =
        this.pos.findClosestByPath(FIND_MY_STRUCTURES, {
          filter: (structure) =>
            structure.structureType === STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
        }) || this.pos.findClosestByPath(FIND_MY_SPAWNS)
      // sometimes when a creep's path is blocked, the above will return null. this is the backup to make sure `closestStore` is defined.
      if (!closestStore) {
        closestStore =
          this.pos.findClosestByRange(FIND_MY_STRUCTURES, {
            filter: (structure) =>
              structure.structureType === STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
          }) || this.pos.findClosestByPath(FIND_MY_SPAWNS)
      }

      // attempt to transfer energy to closestStore
      const result = this.transfer(closestStore, RESOURCE_ENERGY)
      switch (result) {
        case OK:
          break

        case ERR_NOT_IN_RANGE:
          this.moveTo(closestStore)
          break

        default:
          Game.notify(`${transferCodes[-result]}, ${this.name}`)
          console.log(`${transferCodes[-result]}, ${this.name}, target: ${closestStore}`)
          break
      }
    }
  }
}

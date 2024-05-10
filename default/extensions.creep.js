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

const { harvestCodes } = require('./utils.resultCodes')

function harvest(creep) {
  // if creep store isn't full
  if (creep.store.getFreeCapacity() > 0) {
    // find nearest energy source
    const source = creep.pos.findClosestByPath(FIND_SOURCES)

    // harvest the source
    const harvestResult = creep.harvest(source)
    switch (harvestResult) {
      case OK:
      case ERR_BUSY: // creep still spawning
      case ERR_INVALID_TARGET: // all energy sources are blocked
      case ERR_FULL: // creep store is full
        break

      case ERR_NOT_IN_RANGE:
        creep.moveTo(source)
        break

      default:
        Game.notify(`${creep.memory.role} ${harvestCodes[Math.abs(harvestResult)]}`)
        console.log(`${creep.memory.role} ${harvestCodes[Math.abs(harvestResult)]}${creep.name}`)
        break
    }
  }

  // if there are adjacent creeps, transfer energy to them
  const adjacentCreeps = creep.pos
    .findInRange(FIND_MY_CREEPS, 1)
    .slice(1)
    .filter((creep) => creep.memory.role === 'transporter') // the slice is because element 0 is itself
  if (adjacentCreeps.length > 0) {
    adjacentCreeps.map((adjacentCreep) => {
      creep.transfer(adjacentCreep, RESOURCE_ENERGY)
    })
  }
}

module.exports = harvest

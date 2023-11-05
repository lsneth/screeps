const { harvestCodes } = require('./utils.resultCodes')

function harvest(creep) {
  // if creep store isn't full
  if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    // find nearest energy source
    const source = creep.pos.findClosestByPath(FIND_SOURCES)

    // harvest the source
    const result = creep.harvest(source)
    switch (result) {
      case OK:
        break

      case ERR_NOT_IN_RANGE:
        creep.moveTo(source)
        break

      default:
        Game.notify(`${creep.memory.role} ${harvestCodes[-result]}, ${creep.name}`)
        console.log(`${creep.memory.role} ${harvestCodes[-result]}, ${creep.name}`)
        break
    }
  }

  // if there are adjacent creeps, transfer energy to them
  const adjacentCreeps = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
    filter: (c) => c.memory.role === 'transporter' && c.id !== creep.id,
  })

  if (adjacentCreeps.length > 0) {
    creep.transfer(adjacentCreeps[0], RESOURCE_ENERGY)
  }
}

module.exports = harvest

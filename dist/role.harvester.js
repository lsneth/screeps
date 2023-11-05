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

  // a list of roles that a harvester creep is allowed to transfer energy to
  const transferRoles = ['transporter', 'upgrader']

  // if there are adjacent creeps, transfer energy to them
  const adjacentCreeps = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
    filter: (c) => transferRoles.includes(c.memory.role) && c.id !== creep.id,
  })

  if (adjacentCreeps.length > 0) {
    creep.transfer(adjacentCreeps[0], RESOURCE_ENERGY)
  }
}

module.exports = harvest

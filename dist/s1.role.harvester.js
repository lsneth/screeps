const { harvestCodes } = require('./utils.resultCodes')

function harvest(creep) {
  if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
    // harvest the source
    const result = creep.harvest(Game.getObjectById(creep.sourceId))

    switch (result) {
      case OK:
        break
      case ERR_NOT_IN_RANGE:
        creep.moveTo(source)
        break
      default:
        Game.notify(`${harvestCodes[-result]}, (${(creep.pos.x, creep.pos.y)})`)
        console.log(`${harvestCodes[-result]}, (${(creep.pos.x, creep.pos.y)})`)
        break
    }
  }
}

function transfer(creep) {
  // a list of roles that a harvester creep is allowed to transfer energy to
  const transferRoles = ['courier', 'upgrader']

  // if there are adjacent couriers or upgraders, transfer energy to them
  const adjacentCreeps = creep.pos.findInRange(FIND_MY_CREEPS, 1, {
    filter: (c) => transferRoles.includes(c.memory.role) && c.id !== creep.id,
  })

  if (adjacentCreeps.length > 0) {
    creep.transfer(adjacentCreeps[0], RESOURCE_ENERGY)
  }
}

function harvester(creep) {
  harvest(creep)
  transfer(creep)
}

module.exports = harvester

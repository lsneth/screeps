const { getMaxHarvesterCount } = require('./utils.functions')

// spawn priority is top to bottom
function createRolesObject(spawn) {
  const maxHarvesterCount = getMaxHarvesterCount(spawn.room)
  return {
    harvester: {
      name: 'harvester',
      memory: { role: 'harvester' },
      parts: [WORK, CARRY, CARRY, CARRY, MOVE],
      cost: 300,
      maxCount: maxHarvesterCount,
    },
    transporter: {
      name: 'transporter',
      memory: { role: 'transporter' },
      parts: [CARRY, MOVE],
      cost: 100,
      maxCount: Math.floor(maxHarvesterCount / 2),
    },
    upgrader: {
      name: 'upgrader',
      memory: { role: 'upgrader' },
      parts: [WORK, CARRY, MOVE, MOVE],
      cost: 250,
      maxCount: 5,
    },
    builder: {
      name: 'builder',
      memory: { role: 'builder' },
      parts: [WORK, CARRY, MOVE, MOVE],
      cost: 250,
      maxCount: 10,
    },
    repairer: {
      name: 'repairer',
      memory: { role: 'repairer' },
      parts: [WORK, CARRY, MOVE, MOVE],
      cost: 250,
      maxCount: 3,
    },
  }
}

module.exports = createRolesObject

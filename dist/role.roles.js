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
      maxCount: maxHarvesterCount * 2,
    },
    // upgrader: {
    //   name: 'upgrader',
    //   memory: { role: 'upgrader' },
    //   parts: [CARRY, MOVE],
    //   cost: 100,
    //   maxCount: 3,
    // },
  }
}

module.exports = createRolesObject

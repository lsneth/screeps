const roleHarvester = require('role.harvester')
const roleUpgrader = require('role.upgrader')

module.exports.loop = function () {
  // spawn new creeps
  // TODO: figure out good spawn ratio and auto spawning
  if (Game.spawns['Spawn1'].store[RESOURCE_ENERGY] >= 300) {
    if (Math.random() > 0.2) {
      Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], `Harvester${Game.time.toString()}`, {
        memory: { role: 'harvester' },
      })
    } else {
      Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], `Upgrader${Game.time.toString()}`, {
        memory: { role: 'upgrader' },
      })
    }
  }

  for (const name in Game.creeps) {
    const creep = Game.creeps[name]
    if (creep.memory.role === 'harvester') {
      roleHarvester.run(creep)
    }
    if (creep.memory.role === 'upgrader') {
      roleUpgrader.run(creep)
    }
  }
}

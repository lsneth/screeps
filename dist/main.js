const roleHarvester = require('role.harvester')
const roleUpgrader = require('role.upgrader')
const roleBuilder = require('role.builder')
const creeperClasses = require('creeperClasses')

module.exports.loop = function () {
  // spawn new creeps
  if (Game.spawns['Spawn1'].store[RESOURCE_ENERGY] >= 300) {
    if (creeperClasses[0].currentCount < creeperClasses[0].maxCount) {
      Game.spawns['Spawn1'].spawnCreep(creeperClasses[0].parts, `${creeperClasses[0].role}${Game.time.toString()}`, {
        memory: creeperClasses[0].memory,
      })
    } else if (creeperClasses[1].currentCount < creeperClasses[1].maxCount) {
      Game.spawns['Spawn1'].spawnCreep(creeperClasses[1].parts, `${creeperClasses[1].role}${Game.time.toString()}`, {
        memory: creeperClasses[1].memory,
      })
    } else if (creeperClasses[2].currentCount < creeperClasses[2].maxCount) {
      Game.spawns['Spawn1'].spawnCreep(creeperClasses[2].parts, `${creeperClasses[2].role}${Game.time.toString()}`, {
        memory: creeperClasses[2].memory,
      })
    }
  }

  // creep actions
  for (const name in Game.creeps) {
    const creep = Game.creeps[name]
    if (creep.memory.role === 'harvester') {
      roleHarvester.run(creep)
    }
    if (creep.memory.role === 'upgrader') {
      roleUpgrader.run(creep)
    }
    if (creep.memory.role === 'builder') {
      roleBuilder.run(creep)
    }
  }
}

// clear dead creeps from memory
for (const i in Memory.creeps) {
  if (!Game.creeps[i]) {
    delete Memory.creeps[i]
  }
}

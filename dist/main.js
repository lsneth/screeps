const roleHarvester = require('role.harvester')
const roleUpgrader = require('role.upgrader')
const roleBuilder = require('role.builder')
const creeperClasses = require('creeperClasses')

module.exports.loop = function () {
  // spawn new creeps
  if (Game.spawns['Spawn1'].store[RESOURCE_ENERGY] >= 300) {
    const spawnOdds = Math.random()
    let spawnIndex
    if (spawnOdds > 0.6) {
      spawnIndex = 0
    } else if (spawnOdds > 0.3) {
      spawnIndex = 1
    } else {
      spawnIndex = 2
    }

    if (creeperClasses[spawnIndex].currentCount < creeperClasses[spawnIndex].maxCount) {
      Game.spawns['Spawn1'].spawnCreep(
        creeperClasses[spawnIndex].parts,
        `${creeperClasses[spawnIndex].role}${Game.time.toString()}`,
        {
          memory: creeperClasses[spawnIndex].memory,
        }
      )
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

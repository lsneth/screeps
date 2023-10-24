const roleHarvester = require('role.harvester')
const roleUpgrader = require('role.upgrader')
const roleBuilder = require('role.builder')
const creeperClasses = require('creeperClasses')

module.exports.loop = function () {
  // spawn new creeps based on priority in creeperClasses file
  if (Game.spawns['Spawn1'].store[RESOURCE_ENERGY] >= 200) {
    creeperClasses.map((creeperClass) => {
      if (Game.spawns['Spawn1'].store[RESOURCE_ENERGY] >= 300) {
        if (creeperClass.currentCount < creeperClass.maxCount) {
          Game.spawns['Spawn1'].spawnCreep(creeperClass.parts, `${creeperClass.role}${Game.time.toString()}`, {
            memory: { role: creeperClass.role },
          })
        }
      }
    })
  }

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

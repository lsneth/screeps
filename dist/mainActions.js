const roleHarvester = require('role.harvester')
const roleUpgrader = require('role.upgrader')
const roleBuilder = require('role.builder')
const roleRepairer = require('role.repairer')

function mainActions() {
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
    if (creep.memory.role === 'repairer') {
      roleRepairer.run(creep)
    }
  }
}

module.exports = mainActions

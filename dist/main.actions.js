const harvester = require('./role.harvester')
const upgrader = require('./role.upgrader')
const builder = require('./role.builder')
const repairer = require('./role.repairer')

function mainActions() {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name]
    if (creep.memory.role === 'harvester') {
      harvester(creep)
    }
    if (creep.memory.role === 'upgrader') {
      upgrader(creep)
    }
    if (creep.memory.role === 'builder') {
      builder(creep)
    }
    if (creep.memory.role === 'repairer') {
      repairer(creep)
    }
  }
}

module.exports = mainActions
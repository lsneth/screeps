const harvest = require('./role.harvester')
const transport = require('./role.transporter')
const upgrader = require('./role.upgrader')
const builder = require('./role.builder')
const repairer = require('./role.repairer')
const fortifier = require('./role.fortifier')
const attacker = require('./role.attacker')

function mainActions() {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name]
    if (creep.memory.role === 'harvester') {
      harvest(creep)
    }
    if (creep.memory.role === 'transporter') {
      transport(creep)
    }
    // if (creep.memory.role === 'upgrader') {
    //   upgrader(creep)
    // }
    // if (creep.memory.role === 'builder') {
    //   builder(creep)
    // }
    // if (creep.memory.role === 'repairer') {
    //   repairer(creep)
    // }
    // if (creep.memory.role === 'fortifier') {
    //   fortifier(creep)
    // }
    // if (creep.memory.role === 'attacker') {
    //   attacker(creep)
    // }
  }
}

module.exports = mainActions

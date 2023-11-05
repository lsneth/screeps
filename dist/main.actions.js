const harvest = require('./role.harvester')
const transport = require('./role.transporter')
const upgrade = require('./role.upgrader')
// const builder = require('./role.builder')
// const repairer = require('./role.repairer')
// const fortifier = require('./role.fortifier')
// const attacker = require('./role.attacker')

function mainActions() {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name]

    if (creep.memory.role === 'harvester') {
      if (!creep.spawning) harvest(creep)
    }
    if (creep.memory.role === 'transporter') {
      if (!creep.spawning) transport(creep)
    }
    if (creep.memory.role === 'upgrader') {
      if (!creep.spawning) upgrade(creep)
    }
    // if (creep.memory.role === 'builder') {
    //   if (!creep.spawning) builder(creep)
    // }
    // if (creep.memory.role === 'repairer') {
    //   if (!creep.spawning) repairer(creep)
    // }
    // if (creep.memory.role === 'fortifier') {
    //   if (!creep.spawning) fortifier(creep)
    // }
    // if (creep.memory.role === 'attacker') {
    //   if (!creep.spawning) attacker(creep)
    // }
  }
}

module.exports = mainActions

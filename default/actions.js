// const harvest = require('./role.harvester')
// const transport = require('./role.transporter')
// const upgrade = require('./role.upgrader')
// const build = require('./role.builder')
// const repair = require('./role.repairer')
// const fortifier = require('./role.fortifier')
// const attacker = require('./role.attacker')

function mainActions() {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name]

    if (creep.memory.role === 'harvester') {
      if (!creep.spawning) creep.harvestAndTransfer()
    }
    // if (creep.memory.role === 'transporter') {
    //   if (!creep.spawning) transport(creep)
    // }
    // if (creep.memory.role === 'upgrader') {
    //   if (!creep.spawning) upgrade(creep)
    // }
    // if (creep.memory.role === 'builder') {
    //   if (!creep.spawning) build(creep)
    // }
    // if (creep.memory.role === 'repairer') {
    //   if (!creep.spawning) repair(creep)
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

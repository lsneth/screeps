function actions() {
  for (const name in Game.creeps) {
    const creep = Game.creeps[name]

    if (creep.memory.role === 'harvester') {
      if (!creep.spawning) creep.harvestAndTransfer()
    }
    if (creep.memory.role === 'carrier') {
      if (!creep.spawning) creep.collectAndCarry()
    }
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

module.exports = actions

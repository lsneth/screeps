const workerRoles = {
  harvester: {
    name: 'harvester',
    memory: { role: 'harvester' },
    minCount: 1,
    probability: 1,
  },
  transporter: {
    name: 'transporter',
    memory: { role: 'transporter' },
    minCount: 1,
    probability: 1,
  },
  // builder: {
  //   name: 'builder',
  //   memory: { role: 'builder', harvesting: true },
  //   minCount: 2,
  //   probability: 2,
  // },
  // upgrader: {
  //   name: 'upgrader',
  //   memory: { role: 'upgrader', upgrading: false },
  //   minCount: 3,
  //   probability: 3,
  // },
  // repairer: {
  //   name: 'repairer',
  //   memory: { role: 'repairer', harvesting: true, repairsPriority: [] },
  //   minCount: 1,
  //   probability: 4,
  // },
  // fortifier: {
  //   name: 'fortifier',
  //   memory: { role: 'fortifier', harvesting: true, fortifyPriority: [] },
  //   minCount: 1,
  //   probability: 2,
  // },
  // // TODO: move this into attacker roles object
  // attacker: {
  //   name: 'attacker',
  //   memory: { role: 'attacker', attacking: false },
  //   minCount: 2,
  //   probability: 1,
  // },
}

const workerSpawnPool = []
for (const name in workerRoles) {
  for (let i = 0; i < workerRoles[name].probability; i++) {
    workerSpawnPool.push(name)
  }
}

const fightingRoles = {
  attacker: {
    name: 'attacker',
    memory: { role: 'attacker', attacking: false },
    minCount: 4,
    probability: 1,
  },
}

module.exports = { workerRoles, workerSpawnPool }

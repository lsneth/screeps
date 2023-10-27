const roles = {
  harvester: {
    role: 'harvester',
    parts: [WORK, WORK, CARRY, MOVE],
    memory: { role: 'harvester', harvesting: true },
    probability: 6,
  },
  builder: {
    role: 'builder',
    parts: [WORK, WORK, CARRY, MOVE],
    memory: { role: 'builder', building: false },
    probability: 4,
  },
  upgrader: {
    role: 'upgrader',
    parts: [WORK, WORK, CARRY, MOVE],
    memory: { role: 'upgrader', upgrading: false },
    probability: 3,
  },
  repairer: {
    role: 'repairer',
    parts: [WORK, WORK, CARRY, MOVE],
    memory: { role: 'repairer', repairing: false },
    probability: 2,
  },
  attacker: {
    role: 'attacker',
    parts: [MOVE, MOVE, ATTACK, ATTACK, TOUGH, TOUGH, TOUGH, TOUGH],
    memory: { role: 'attacker', attacking: false },
    probability: 1,
  },
}

function buildRolesArray() {
  const rolesArray = []
  for (let role in roles) {
    for (let i = 0; i < roles[role].probability; i++) {
      rolesArray.push(roles[role])
    }
  }

  return rolesArray
}

module.exports = { roles, buildRolesArray }

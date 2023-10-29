const roles = {
  harvester: {
    role: 'harvester',
    parts: [WORK, CARRY, MOVE, MOVE],
    memory: { role: 'harvester', harvesting: true },
    probability: 5,
  },
  builder: {
    role: 'builder',
    parts: [WORK, CARRY, MOVE, MOVE],
    memory: { role: 'builder', harvesting: true },
    probability: 4,
  },
  upgrader: {
    role: 'upgrader',
    parts: [WORK, CARRY, MOVE, MOVE],
    memory: { role: 'upgrader', upgrading: false },
    probability: 2,
  },
  repairer: {
    role: 'repairer',
    parts: [WORK, CARRY, MOVE, MOVE],
    memory: { role: 'repairer', harvesting: true, repairsPriority: [] },
    probability: 1,
  },
  attacker: {
    role: 'attacker',
    parts: [TOUGH, TOUGH, ATTACK, MOVE, MOVE, MOVE],
    memory: { role: 'attacker', attacking: false },
    probability: 1,
  },
}

function buildRolesArray() {
  const rolesArray = []
  for (let role in roles) {
    for (let i = 0; i < roles[role].probability; i++) {
      rolesArray.push(roles[role].role)
    }
  }

  return rolesArray
}

module.exports = { roles, buildRolesArray }

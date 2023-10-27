const roles = {
  harvester: {
    role: 'harvester',
    parts: [WORK, WORK, CARRY, MOVE],
    memory: { role: 'harvester', harvesting: true, destinationId: null },
    probability: 6,
  },
  builder: {
    role: 'builder',
    parts: [WORK, WORK, CARRY, MOVE],
    memory: { role: 'builder', building: false },
    probability: 3,
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

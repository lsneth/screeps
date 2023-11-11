function createRoleObject({ roleName, assignmentId, stage }) {
  switch (roleName) {
    case 'harvester':
      let harvesterParts
      if (stage === 1) harvesterParts = [WORK, CARRY, MOVE]
      if (stage === 2) harvesterParts = [WORK, WORK, CARRY, MOVE]
      if (stage === 3) harvesterParts = [WORK, WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE]

      return {
        memory: { role: roleName, assignmentId },
        parts: harvesterParts,
      }

    case 'transporter':
      let transporterParts
      if (stage === 1) transporterParts = [CARRY, MOVE]
      if (stage === 2) transporterParts = [CARRY, MOVE, CARRY, MOVE]
      if (stage === 3) transporterParts = [CARRY, MOVE, CARRY, MOVE, CARRY, MOVE, CARRY, MOVE]

      return {
        memory: { role: roleName, assignmentId },
        parts: transporterParts,
      }

    default:
      break
  }

  // upgrader: {
  //   name: 'upgrader',
  //   memory: { role: 'upgrader' },
  //   parts: [WORK, CARRY, MOVE, MOVE],
  //   cost: 250,
  //   count: 5,
  // },
  // builder: {
  //   name: 'builder',
  //   memory: { role: 'builder' },
  //   parts: [WORK, CARRY, MOVE, MOVE],
  //   cost: 250,
  //   count: 10,
  // },
  // repairer: {
  //   name: 'repairer',
  //   memory: { role: 'repairer' },
  //   parts: [WORK, CARRY, MOVE, MOVE],
  //   cost: 250,
  //   count: 3,
  // },
}

module.exports = createRoleObject

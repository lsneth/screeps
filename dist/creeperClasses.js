const creeperClasses = [
  {
    role: 'harvester',
    currentCount:
      _(Game.creeps)
        .filter({ memory: { role: 'harvester' } })
        .size() || 0,
    maxCount: 10,
    parts: [WORK, CARRY, MOVE],
  },
  {
    role: 'builder',
    currentCount:
      _(Game.creeps)
        .filter({ memory: { role: 'builder' } })
        .size() || 0,
    maxCount: 10,
    parts: [WORK, CARRY, MOVE],
  },
  {
    role: 'upgrader',
    currentCount:
      _(Game.creeps)
        .filter({ memory: { role: 'upgrader' } })
        .size() || 0,
    maxCount: 10,
    parts: [WORK, CARRY, MOVE],
  },
]

module.exports = creeperClasses

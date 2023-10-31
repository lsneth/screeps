function makeCreeperBody(energy, role) {
  // worker roles
  if (['harvester', 'upgrader', 'builder', 'repairer', 'fortifier'].includes(role)) {
    const numParts = Math.floor((energy - 300) / 200) // TODO; figure out better solution. the -300 is there so the harvesters don't go back to the spawn every time but it causes problems in main.spawn
    const body = []
    for (let i = 0; i < numParts; i++) {
      body.push(WORK) // 100
    }
    for (let i = 0; i < numParts; i++) {
      body.push(CARRY) // 50
    }
    for (let i = 0; i < numParts; i++) {
      body.push(MOVE) // 50
    }
    return body
  }
}

module.exports = makeCreeperBody

function makeCreeperBody(energy, role) {
  const body = []
  let numParts

  switch (role) {
    case 'harvester':
      numParts = Math.floor((energy - 50) / 150)
      for (let i = 0; i < numParts; i++) {
        body.push(WORK) // 100
      }
      for (let i = 0; i < numParts; i++) {
        body.push(CARRY) // 50
      }
      body.push(MOVE) // 50
      return body

    case 'transporter':
      numParts = Math.floor(energy / 100)
      for (let i = 0; i < numParts; i++) {
        body.push(CARRY) // 50
      }
      for (let i = 0; i < numParts; i++) {
        body.push(MOVE) // 50
      }
      return body

    default:
      break
  }
}

module.exports = makeCreeperBody

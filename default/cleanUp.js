function cleanUp() {
  // clear dead creeps from memory
  for (const i in Memory.creeps) {
    if (!Game.creeps[i]) {
      delete Memory.creeps[i]
    }
  }
}

module.exports = cleanUp

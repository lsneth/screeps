function setUpRooms() {
  _.forEach(Game.rooms, (room) => {
    if (!room.memory.maxRoleCounts) {
      room.memory.maxRoleCounts = { harvester: 0 }

      // map through all sources
      room.find(FIND_SOURCES).map((source) => {
        // get 3x3 grid of squares around source
        const sourceArea = room.lookAtArea(source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1)
        // count how many are not wall terrain and save it to memory
        for (const y in sourceArea) {
          for (const x in sourceArea[y]) {
            sourceArea[y][x].map((element) => {
              if (element.type === 'terrain' && element.terrain !== 'wall') {
                room.memory.maxRoleCounts.harvester += 1
              }
            })
          }
        }
      })
    }
  })
}

module.exports = setUpRooms

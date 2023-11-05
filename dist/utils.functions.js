function getMaxHarvesterCount(room) {
  // we shouldn't have any more harvesters in a room than there are spaces to harvest from
  let harvestSpaceCount = 0
  // map through all sources
  room.find(FIND_SOURCES).map((source) => {
    // get 3x3 grid of squares around source
    const area = room.lookAtArea(source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1)
    // count how many of them are spaces where energy can be harvested from
    for (const y in area) {
      for (const x in area[y]) {
        area[y][x].map((element) => {
          if (element.type === 'terrain' && element.terrain !== 'wall') {
            harvestSpaceCount += 1
          }
        })
      }
    }
  })

  return harvestSpaceCount
}

module.exports = { getMaxHarvesterCount }

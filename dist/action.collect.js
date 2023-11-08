// TODO: figure out how to go to the harvesters that are never the closest
// TODO: figure out how to get rid of the extra tick after the creep is filled with energy
function collect(creep) {
  // move towards a harvester. when the creep gets there, the harvester will fill it with energy.
  const closestHarvester = creep.pos.findClosestByPath(FIND_MY_CREEPS, {
    filter: (c) =>
      c.memory.role === 'harvester' &&
      c.store.getUsedCapacity(RESOURCE_ENERGY) / c.store.getCapacity(RESOURCE_ENERGY) > 0.33, // this 33% is arbitrary for now. It helps creeps get around to all harvesters and not ignore the ones that are just a bit further than others.
  })
  creep.moveTo(closestHarvester)
}

module.exports = collect

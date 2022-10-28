
export function sortArrayByProp(prop) {
  return function(obj1, obj2) {
    let val1 = obj1[prop]
    let val2 = obj2[prop]
    if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
      val1 = Number(val1)
      val2 = Number(val2)
    }
    if (val1 < val2) {
      return -1
    }
    else if (val1 > val2) {
      return 1
    }
    else {
      return 0
    }
  }
}

function sortMap(map, isKeyUpSort) {
  let keys = []
  for (var key of map.keys()) {
    keys.push(key)
  }
  if (isKeyUpSort) {
    keys.sort(function(key1, key2) {
      return key1 - key2
    })
  }
  else {
    keys.sort(function(key1, key2) {
      return key2 - key1
    })
  }
  let newMap = new Map()
  keys.forEach((key) => {
    newMap.set(key, map.get(key))
  })
  return newMap
}
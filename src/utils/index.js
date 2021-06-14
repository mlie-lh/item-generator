export const UUID = () => Math.random().toString(36).substr(2)

// 深拷贝对象
export const deepClone = obj => {
  const _toString = Object.prototype.toString

  // null, undefined, non-object, function
  if (!obj || typeof obj !== 'object') {
    return obj
  }

  // DOM Node
  if (obj.nodeType && 'cloneNode' in obj) {
    return obj.cloneNode(true)
  }

  // Date
  if (_toString.call(obj) === '[object Date]') {
    return new Date(obj.getTime())
  }

  // RegExp
  if (_toString.call(obj) === '[object RegExp]') {
    const flags = []
    if (obj.global) {
      flags.push('g')
    }
    if (obj.multiline) {
      flags.push('m')
    }
    if (obj.ignoreCase) {
      flags.push('i')
    }

    return new RegExp(obj.source, flags.join(''))
  }

  const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}

  for (const key in obj) {
    result[key] = deepClone(obj[key])
  }

  return result
}
// 节点查找
export const findNode = (unitKey, tree) => {
  for (const node of tree) {
    if (node.unitKey === unitKey) {
      return node
    }
    if (node.children) {
      const curNode = findNode(unitKey, node.children)
      if (curNode) return curNode
    }
  }
  return null
}

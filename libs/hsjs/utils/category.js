export const getCategory = (nodes) => {
  let treeObj = {}
  let getNode = (node) => {
    if (node) {
      treeObj[node.categoryId] = node.name
      const children = node.children
      if (children && children.length > 0) {
        for (const item of children) {
          getNode(item)
        }
      }
    }
  }
  for (const elem of nodes) {
    getNode(elem)
  }
  return treeObj
}

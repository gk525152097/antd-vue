/**
 * list transform to tree
 * @param list
 * @returns {*}
 */

function transform (list) {
  if (!list) return
  list.filter(item => {
    item.key = item.id
    item.title = item.name
  })
  let tree = []
  for (let i = 0; i < list.length; i++) {
    for (let j = i; j < list.length; j++) {
      if (list[j].parentId === list[i].id) {
        if (list[i].children === undefined) {
          list[i].children = []
        }
        list[i].children.push(list[j])
      } else if (list[j].id === list[i].parentId) {
        if (list[j].children === undefined) {
          list[j].children = []
        }
        list[j].children.push(list[i])
      }
    }

    if (list[i].children && list[i].children.length) {
      let newArray = []
      newArray.length = list[i].children.length
      list[i].children.map(function (item) {
        newArray[item.rank] = item
      })
      list[i].children = newArray
    }

    if (list[i].parentId === null) {
      tree.push(list[i])
    }
  }
  return tree
}

export default transform

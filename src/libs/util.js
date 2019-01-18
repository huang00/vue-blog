/**
 * @param {array} 需要生成的数据
 * @param {array} 已经选中的数据
 * @returns {array} 树形数据
 * @description 创建树形数据
 */
export const creatTreeData = (list, selectedList = []) => {
    let res = []
    /* 首先创建一级目录 */
    for (let i = 0, len = list.length; i < len; i++) {
        let item = list[i]
        if (item.level === 1)
            res.push({
                ...item,
                children: [],
                indeterminate: false,
                checkAll: false,
                checkAllGroup: []
            })
    }

    for (let i = 0, len = list.length; i < len; i++) {
        let item = list[i]
        let index = selectedList.indexOf(item.id)
        if (item.level === 2) {
            /* 创建子目录 */
            for (let k = 0, lenk = res.length; k < lenk; k++) {
                let subItem = res[k]
                if (item.parentId === subItem.id)
                    subItem.children.push(item)
                if (index >= 0 && item.parentId === subItem.id)
                    subItem.checkAllGroup.push(selectedList[index])

                let subItemLen = subItem.children.length
                let checkAllGroupLen = subItem.checkAllGroup.length
                
                subItem.checkAll = !subItemLen && selectedList.indexOf(subItem.id) >= 0
                if (subItemLen === checkAllGroupLen && checkAllGroupLen > 0) {
                    subItem.checkAll = true
                    subItem.indeterminate = false
                } else if (subItemLen !== checkAllGroupLen && checkAllGroupLen > 0)
                    subItem.indeterminate = true
            }
        }
    }
    return res
}

export const allPermissionList = [
    {id: 1, name: '房态', level: 1},
    {id: 2, name: '订单', level: 1},
    {id: 3, name: '财务', level: 1},
    {id: 4, name: '流水支出表', parentId: 3, level: 2},
    {id: 5, name: '直连对账表', parentId: 3, level: 2},
    {id: 6, name: '管理', level: 1},
    {id: 7, name: '房型房号', parentId: 6, level: 2},
    {id: 8, name: '门店信息', parentId: 6, level: 2}
]

import store from '@/store'

export default {
  hello: 'hello',
  permissionList: [],
  permission: {
    menuCode: '',
    info: []
  },

  setUserInfo(data) {
    store.dispatch('user/setCurUserInfo', data)
    this.setPermission(data)
  },
  setPermission(data) {
    const menuPermission = data.permission

    const grouped = this.groupBy(menuPermission, 'menuCode')
    const list = []
    for (const i in grouped) {
      this.permission = {
        menuCode: i,
        info: grouped[i]
      }
      list.push(this.permission)

      console.log(this.permission.menuCode)
    }
    console.log(list)

    console.log('permission', list)

    store.dispatch('user/setAllPermission', list)
  },
  groupBy(array, key) {
    const result = []
    array.forEach(item => {
      if (!result[item[key]]) {
        result[item[key]] = []
      }
      result[item[key]].push(item)
    })
    return result
  }
}

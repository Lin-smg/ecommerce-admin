import { getPermissionGroupList } from '@/api/permission'

export const PermissionGroup = {
  name: 'Index',
  data() {
    return {
      groupPermissionCreateForm: this.initGroupPermissionCreateForm(),
      groupPermissionUpdateForm: this.initGroupPermissionUpdateForm(),
      activeName: 'view',
      pageSize: 10,
      pageIndex: 1,
      permissionGroupData: [],
      totalCount: 0,
      searchValue: ''
    }
  },
  created() {
    this.getPermissionGruop()
  },
  computed: {
    groups() {
      return groupBy(this.$store.getters.allPermission, 'menuCode')
    }
  },
  methods: {

    getPermissionNameFromCode(data) {
      const result = []
      const allPermission = this.$store.getters.allPermission
      for (const obj of data) {
        result.push(allPermission.find(({ permissionCode }) => permissionCode === obj).permissionName)
      }
      return result
    },

    handleCheckedPermissionChange(value) {
      var checkedList = this.groupPermissionCreateForm.permissions
      const uniqueCheckList = new Set()
      checkedList.forEach(element => {
        const checkedValueMenuCode = element.toString().substring(0, 4)
        uniqueCheckList.add(checkedValueMenuCode + 'B00')
        uniqueCheckList.add(element)
      })
      this.groupPermissionCreateForm.permissions = []
      this.groupPermissionCreateForm.permissions = Array.from(uniqueCheckList)
    },
    handleCheckedPermissionChangeForUpdate(value) {
      var checkedList = this.groupPermissionUpdateForm.permissions
      const uniqueCheckList = new Set()
      checkedList.forEach(element => {
        const checkedValueMenuCode = element.toString().substring(0, 4)
        uniqueCheckList.add(checkedValueMenuCode + 'B00')
        uniqueCheckList.add(element)
      })
      this.groupPermissionUpdateForm.permissions = []
      this.groupPermissionUpdateForm.permissions = Array.from(uniqueCheckList)
    },

    async getPermissionGruop() {
      const params = {
        group: '',
        sort: '',
        cur_page: this.pageIndex,
        per_page: this.pageSize,
        q: this.searchValue ? this.searchValue : ''
      }

      this.listLoading = true
      await getPermissionGroupList(params).then(response => {
        this.permissionGroupData = []
        for (const data of response.data) {
          var str = data.permissions.replace('{', '[')
          str = str.replace('}', ']')
          const pdataList = JSON.parse(str)
          const obj = {
            'id': data.id,
            'groupCode': data.groupCode,
            'groupName': data.groupName,
            'permissions': pdataList,
            'permissionNames': this.getPermissionNameFromCode(pdataList)
          }
          this.permissionGroupData.push(obj)
        }

        this.pageIndex = response.meta.curPage
        this.pageSize = response.meta.perPage
        this.totalCount = response.meta.totalResults
        this.groupPermissionCreateForm = this.initGroupPermissionCreateForm()
        this.groupPermissionUpdateForm = this.initGroupPermissionUpdateForm()
        this.listLoading = false
      })
    },

    initGroupPermissionCreateForm() {
      return {
        'groupCode': '',
        'groupName': '',
        'permissions': ['M000B00']
      }
    },

    initGroupPermissionUpdateForm() {
      return {
        'id': '',
        'groupCode': '',
        'groupName': '',
        'permissions': ['M000B00']
      }
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.getPermissionGruop()
    },

    handleCurrentChange(val) {
      this.pageIndex = val
      this.getPermissionGruop()
    },

    searchClick() {
      this.getPermissionGruop()
    },

    async createOk() {
      // this.$refs.userCreateForm.validate(valid => {
      //   if (valid) {
      this.loading = true
      this.$store.dispatch('permission/createPermissionGroup', this.groupPermissionCreateForm).then(() => {
        this.handleTab('view')
        this.getPermissionGruop()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },

    createReset() {
      this.selectedObject = ''
      this.$refs['unitCreateForm'].resetFields()
      this.initCreateForm()
    },

    deleteData(data) {
      this.loading = true
      this.$store.dispatch('permission/deletePermissionGroup', data).then(() => {
        this.handleTab('view')
        this.getPermissionGruop()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },

    updateOk() {
      // this.$refs.userCreateForm.validate(valid => {
      //   if (valid) {
      this.loading = true
      this.$store.dispatch('permission/updatePermissionGroup', this.groupPermissionUpdateForm).then(() => {
        this.groupPermissionUpdateForm = this.initGroupPermissionUpdateForm()
        this.handleTab('view')
        this.getPermissionGruop()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },

    updateReset() {

    },

    updateData(data) {
      this.groupPermissionUpdateForm.id = data.id
      this.groupPermissionUpdateForm.groupCode = data.groupCode
      this.groupPermissionUpdateForm.groupName = data.groupName
      this.groupPermissionUpdateForm.permissions = data.permissions
      this.handleTab('update')
    },

    handleTab(tab) {
      if (tab === 'view') {
        this.getPermissionGruop()
      }
      this.activeName = tab
    }
  }

}
function groupBy(array, key) {
  const result = {}
  array.forEach(item => {
    if (!result[item[key]]) {
      result[item[key]] = []
    }
    result[item[key]].push(item)
  })
  return result
}

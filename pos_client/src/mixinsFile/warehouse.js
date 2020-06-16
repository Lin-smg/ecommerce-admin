import { getWarehouseList } from '@/api/warehouse'
export const Warehouse = {
  name: 'Index',
  data() {
    return {
      activeName: 'view',
      pageSize: 10,
      pageIndex: 1,
      warehousesData: [],
      totalCount: 0,
      warehouseCreateForm: {
        'wareHouseName': '',
        'location': '',
        'space': '',
        'remark': ''
      },
      warehouseUpdateForm: {
        name: '',
        userId: ''
      },
      searchValue: ''
    }
  },
  created() {
    this.getWarehouse()
  },
  computed: {
    groups() {
      return groupBy(this.$store.getters.allPermission, 'menuCode')
    }
  },
  methods: {

    handleCheckedPermissionChange(value) {
      var checkedList = this.userCreateForm.permissions
      const uniqueCheckList = new Set()
      checkedList.forEach(element => {
        const checkedValueMenuCode = element.toString().substring(0, 4)
        uniqueCheckList.add(checkedValueMenuCode + 'B00')
        uniqueCheckList.add(element)
      })
      this.userCreateForm.permissions = []
      this.userCreateForm.permissions = Array.from(uniqueCheckList)
    },

    async getWarehouse() {
      const params = {
        group: '',
        sort: '',
        cur_page: this.pageIndex,
        per_page: this.pageSize,
        q: this.searchValue ? this.searchValue : ''
      }

      this.listLoading = true
      await getWarehouseList(params).then(response => {
        this.warehousesData = response.data
        this.pageIndex = response.meta.curPage
        this.pageSize = response.meta.perPage
        this.totalCount = response.meta.totalResults
        this.listLoading = false
      })
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.getWarehouse()
    },

    handleCurrentChange(val) {
      this.pageIndex = val
      this.getWarehouse()
    },

    searchClick() {
      this.getWarehouse()
    },

    async createOk() {
      // this.$refs.userCreateForm.validate(valid => {
      //   if (valid) {
      this.loading = true
      this.$store.dispatch('warehouse/createWarehouse', this.warehouseCreateForm).then(() => {
        this.handleTab('view')
        this.getWarehouse()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },

    createReset() {

    },

    deleteUser(data) {
      console.log('delete', data)
    },

    updateOk() {

    },

    updateReset() {

    },

    updateUser(data) {
      console.log('update', data)
      this.userUpdateForm.name = data.username
      this.userUpdateForm.userId = data.userid
      this.handleTab('update')
    },

    handleTab(tab) {
      console.log(tab)
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

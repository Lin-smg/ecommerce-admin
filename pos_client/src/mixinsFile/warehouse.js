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
      warehouseCreateForm: this.initCreateWareHouseForm(),
      warehouseUpdateForm: this.initUpdateWareHouseForm(),
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

    initCreateWareHouseForm() {
      return {
        'wareHouseName': '',
        'location': '',
        'space': '',
        'remark': ''
      }
    },
    initUpdateWareHouseForm() {
      return {
        'id': '',
        'wareHouseName': '',
        'location': '',
        'space': '',
        'remark': ''
      }
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
        this.warehouseCreateForm = this.initCreateWareHouseForm()
        this.warehouseUpdateForm = this.initUpdateWareHouseForm()
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

    deleteWareHouse(data) {
      this.loading = true
      this.$store.dispatch('warehouse/deleteWarehouse', data).then(() => {
        this.handleTab('view')
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },

    updateOk() {
      this.loading = true
      this.$store.dispatch('warehouse/updateWarehouse', this.warehouseUpdateForm).then(() => {
        this.handleTab('view')
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },

    updateReset() {

    },

    updateWareHouse(data) {
      this.warehouseUpdateForm = data
      this.handleTab('update')
    },

    handleTab(tab) {
      if (tab === 'view') {
        this.getWarehouse()
        this.warehouseCreateForm = this.initCreateWareHouseForm()
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

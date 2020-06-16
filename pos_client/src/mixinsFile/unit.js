import { getUnitList } from '@/api/unit'

export const Unit = {
  name: 'Index',
  data() {
    return {
      unitCreateForm: this.initCreateForm(),
      unitUpdateForm: this.initUpdateForm(),
      activeName: 'view',
      pageSize: 10,
      pageIndex: 1,
      unitsData: [],
      totalCount: 0,
      searchValue: '',
      childUnitsList: [],
      childUnitsListForUpdate: [],
      selectedObject: '',
      selectedUpdatedObject: ''
    }
  },
  created() {
    this.getUnits()
  },

  methods: {
    async getUnits() {
      const params = {
        group: '',
        sort: '',
        cur_page: this.pageIndex,
        per_page: this.pageSize,
        q: this.searchValue ? this.searchValue : ''
      }

      this.listLoading = true
      await getUnitList(params).then(response => {
        this.unitsData = response.data
        this.childUnitsList = []
        this.childUnitsListForUpdate = []
        this.selectedObject = ''
        this.selectedUpdatedObject = ''
        for (const data of response.all) {
          const obj = {
            id: data.id,
            unitName: data.unitName
          }
          this.childUnitsList.push(obj)
          this.childUnitsListForUpdate.push(obj)
        }
        this.pageIndex = response.meta.curPage
        this.pageSize = response.meta.perPage
        this.totalCount = response.meta.totalResults
        this.listLoading = false
      })
    },

    initCreateForm() {
      return {
        'unitName': '',
        'unitQty': 1,
        'childUnitId': '',
        'childUnitName': '',
        'childUnitQty': 0
      }
    },

    initUpdateForm() {
      return {
        'id': '',
        'unitName': '',
        'unitQty': 1,
        'childUnitId': '',
        'childUnitName': '',
        'childUnitQty': 0
      }
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.getUnits()
    },

    handleCurrentChange(val) {
      this.pageIndex = val
      this.getUnits()
    },

    searchClick() {
      this.getUnits()
    },

    async createOk() {
      // this.$refs.userCreateForm.validate(valid => {
      //   if (valid) {
      this.unitCreateForm.childUnitId = this.selectedObject.id
      this.unitCreateForm.childUnitName = this.selectedObject.unitName
      this.loading = true
      this.$store.dispatch('unit/createUnit', this.unitCreateForm).then(() => {
        this.unitCreateForm = this.initCreateForm()
        this.handleTab('view')
        this.getUnits()
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

    deleteUnit(data) {
      this.loading = true
      this.$store.dispatch('unit/deleteUnit', data).then(() => {
        this.handleTab('view')
        this.getUnits()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },

    updateOk() {
      // this.$refs.userCreateForm.validate(valid => {
      //   if (valid) {
      this.unitUpdateForm.childUnitId = this.selectedUpdatedObject.id
      this.unitUpdateForm.childUnitName = this.selectedUpdatedObject.unitName
      this.loading = true
      this.$store.dispatch('unit/updateUnit', this.unitUpdateForm).then(() => {
        this.unitUpdateForm = this.initUpdateForm()
        this.handleTab('view')
        this.getUnits()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },

    updateReset() {

    },

    updateUnit(data) {
      this.unitUpdateForm.id = data.id
      this.unitUpdateForm.unitName = data.unitName
      this.unitUpdateForm.unitQty = data.unitQty
      this.unitUpdateForm.childUnitQty = data.childUnitQty
      this.selectedUpdatedObject = {
        id: data.childUnitId,
        unitName: data.childUnitName
      }
      this.handleTab('update')
    },

    handleTab(tab) {
      if (tab === 'view') {
        this.getUnits()
      }
      this.activeName = tab
    }
  }

}

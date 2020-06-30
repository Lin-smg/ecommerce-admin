import { getSupplierList, exportExcelSupplierList } from '@/api/supplier'
import { parseTime } from '@/utils'
export const User = {
  name: 'Index',
  data() {
    return {
      activeName: 'view',
      pageSize: 10,
      pageIndex: 1,
      suppliersData: [],
      totalCount: 0,
      suppliersCreateForm: this.resetCreateSupplierForm(),
      suppliersUpdateForm: this.resetCreateSupplierForm(),
      searchValue: '',
      downloadLoading: false,
      filename: 'supplierList',
      autoWidth: true,
      bookType: 'xlsx',
      exportList: [],
      supplierRule: {
        name: [{ required: true, message: 'Please input Name', trigger: 'blur' }],
        email: [{ type: 'email', message: 'Please input Email', trigger: 'blur' }],
        phone: [{ required: true, message: 'Please input Phone', trigger: 'blur' }],
        addressOne: [{ required: true, message: 'Please input Address', trigger: 'blur' }]

      }
    }
  },
  created() {
    this.getSuppliers()
  },
  methods: {
    async exportExcelSupplierList() {
      await exportExcelSupplierList().then(response => {
        var i = 1
        for (const obj of response.data) {
          obj.count = i
          this.exportList.push(obj)
          i = i + 1
        }
      })
    },
    async handleDownload() {
      this.downloadLoading = true
      await this.exportExcelSupplierList()
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['No', 'Name', 'Phone', 'Address', 'City']
        const filterVal = ['count', 'name', 'phone', 'addressOne', 'city']
        const list = this.exportList
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    resetCreate() {
      this.$refs['suppliersCreateForm'].resetFields()
      this.suppliersCreateForm = this.resetCreateSupplierForm()
    },
    updateCancel() {
      this.handleTab('view')
    },
    handleTab(tab) {
      this.activeName = tab
      if (this.activeName === 'view') {
        this.suppliersCreateForm = this.resetCreateSupplierForm()
        this.getSuppliers()
      }
    },

    resetCreateSupplierForm() {
      return {
        name: '',
        email: '',
        phone: '',
        imageUrl: '',
        addressOne: '',
        addressTwo: '',
        city: '',
        stateOrProvince: '',
        zipCode: '',
        country: '',
        comments: '',
        internalNotes: '',
        companyName: '',
        account: ''
      }
    },

    async getSuppliers() {
      const params = {
        group: '',
        sort: '',
        cur_page: this.pageIndex,
        per_page: this.pageSize,
        q: this.searchValue ? this.searchValue : ''
      }

      this.listLoading = true
      await getSupplierList(params).then(response => {
        this.suppliersData = response.data
        this.pageIndex = response.meta.curPage
        this.pageSize = response.meta.perPage
        this.totalCount = response.meta.totalResults
        this.listLoading = false
      })
    },

    async createSupplier() {
      this.$refs.suppliersCreateForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch('supplier/createSupplier', this.suppliersCreateForm)
            .then(() => {
              this.handleTab('view')
            })
            .catch(() => {
              console.log('Create supplier error')
            })
        }
      })
    },

    updateSupplier(row) {
      this.handleTab('update')
      this.suppliersUpdateForm = row
    },

    async updateSupplierOk() {
      this.$refs.suppliersUpdateForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch('supplier/updateSupplier', this.suppliersUpdateForm)
            .then(() => {
              this.handleTab('view')
            })
            .catch(() => {
              console.log('Update supplier error')
            })
        }
      })
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.getSuppliers()
    },

    handleCurrentChange(val) {
      this.pageIndex = val
      this.getSuppliers()
    },

    searchClick() {
      this.getSuppliers()
    },

    async deleteSupplier(data) {
      console.log('delete', data)
      this.$store
        .dispatch('supplier/deleteSupplier', data)
        .then(() => {
          this.handleTab('view')
        })
        .catch(() => {
          console.log('Delete supplier error')
        })
    },

    handleAvatarSuccess(res, file) {
      console.log('Image Upload')
      this.suppliersCreateForm.imageUrl = URL.createObjectURL(file.raw)
    },

    beforeAvatarUpload(file) {
      console.log('File=>', file)
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('Avatar picture must be JPG format!')
      }
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}

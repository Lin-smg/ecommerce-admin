import { getSupplierList } from '@/api/supplier'
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
      getSupplierList(params).then(response => {
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

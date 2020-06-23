import { getSupplierList } from '@/api/supplier'
export const User = {
  name: 'Index',
  data() {
    const validateSupplier = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Invalid input'))
      } else {
        callback()
      }
    }
    return {
      activeName: 'view',
      pageSize: 10,
      pageIndex: 1,
      suppliersData: [],
      totalCount: 0,
      suppliersCreateForm: {
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
      },
      searchValue: '',
      supplierRule: {
        name: [{ required: true, validator: validateSupplier }],
        email: [{ type: 'email' }],
        phone: [{ required: true, validator: validateSupplier }],
        addressOne: [{ required: true, validator: validateSupplier }],
        addressTwo: [{ required: true, validator: validateSupplier }],
        city: [{ required: true, validator: validateSupplier }],
        stateOrProvince: [{ required: true, validator: validateSupplier }],
        zipCode: [{ required: true, validator: validateSupplier }],
        country: [{ required: true, validator: validateSupplier }],
        comments: [{ required: true, validator: validateSupplier }],
        internalNotes: [{ required: true, validator: validateSupplier }],
        companyName: [{ required: true, validator: validateSupplier }],
        account: [{ required: true, validator: validateSupplier }]
      }
    }
  },
  created() {
    this.getSuppliers()
  },
  computed: {
    groups() {
      return groupBy(this.$store.getters.allPermission, 'menuCode')
    }
  },
  methods: {
    handleTab(tab) {
      this.activeName = tab
      if (this.activeName === 'view') {
        this.getSuppliers()
      }
      if (this.activeName === 'create') {
        this.resetCreateSupplierForm()
      }
    },

    resetCreateSupplierForm() {
      this.suppliersCreateForm.name = ''
      this.suppliersCreateForm.email = ''
      this.suppliersCreateForm.phone = ''
      this.suppliersCreateForm.imageUrl = ''
      this.suppliersCreateForm.addressOne = ''
      this.suppliersCreateForm.addressTwo = ''
      this.suppliersCreateForm.city = ''
      this.suppliersCreateForm.stateOrProvince = ''
      this.suppliersCreateForm.zipCode = ''
      this.suppliersCreateForm.country = ''
      this.suppliersCreateForm.comments = ''
      this.suppliersCreateForm.internalNotes = ''
      this.suppliersCreateForm.companyName = ''
      this.suppliersCreateForm.account = ''
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
        console.log('request', params)
        console.log('Supplier data', response)
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
      this.suppliersCreateForm = row
      console.log('Update supplier =>', this.suppliersCreateForm)
    },

    async updateSupplierOk() {
      this.$refs.suppliersCreateForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch('supplier/updateSupplier', this.suppliersCreateForm)
            .then(() => {
              this.resetCreateSupplierForm()
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
      this.getCustomers()
    },

    handleCurrentChange(val) {
      this.pageIndex = val
      this.getCustomers()
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

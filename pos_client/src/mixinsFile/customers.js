import { getCustomerList, exportExcelCustomerList } from '@/api/customer'
import { parseTime } from '@/utils'
export const User = {
  name: 'Index',
  data() {
    return {
      activeName: 'view',
      pageSize: 10,
      pageIndex: 1,
      customersData: [],
      totalCount: 0,
      customersCreateForm: this.resetCreateCustomersForm(),
      customersUpdateForm: this.resetCreateCustomersForm(),
      searchValue: '',
      downloadLoading: false,
      filename: 'customerList',
      autoWidth: true,
      bookType: 'xlsx',
      exportList: [],
      listLoading: false,
      customerRule: {
        name: [{ required: true, message: 'Please input Name', trigger: 'blur' }],
        email: [{ type: 'email', message: 'Please input Email', trigger: 'blur' }],
        phone: [{ required: true, message: 'Please input Phone', trigger: 'blur' }],
        addressOne: [{ required: true, message: 'Please input Address', trigger: 'blur' }]

      }
    }
  },
  created() {
    this.getCustomers()
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
        this.customersCreateForm = this.resetCreateCustomersForm()
        this.getCustomers()
      } else if (this.activeName === 'create') {
        this.resetCreateCustomersForm()
      }
    },
    resetUpdateCustomersForm() {
      this.handleTab('view')
    },
    async exportExcelCustomerList() {
      await exportExcelCustomerList().then(response => {
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
      await this.exportExcelCustomerList()
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
      this.$refs['customersCreateForm'].resetFields()
      this.customersCreateForm = this.resetCreateCustomersForm()
    },

    resetCreateCustomersForm() {
      return { id: null,
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
        account: '' }
    },

    async getCustomers() {
      const params = {
        group: '',
        sort: '',
        cur_page: this.pageIndex,
        per_page: this.pageSize,
        q: this.searchValue ? this.searchValue : ''
      }

      this.listLoading = true
      getCustomerList(params).then(response => {
        this.customersData = response.data
        this.pageIndex = response.meta.curPage
        this.pageSize = response.meta.perPage
        this.totalCount = response.meta.totalResults
        this.listLoading = false
      })
    },

    async createCustomers() {
      this.$refs.customersCreateForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch('customer/createCustomer', this.customersCreateForm)
            .then(() => {
              this.handleTab('view')
            })
            .catch(() => {
              console.log('Create customer error')
            })
        }
      })
    },

    updateCustomers(row) {
      this.handleTab('update')
      this.customersUpdateForm = row
    },

    async updateCustomerOk() {
      this.$refs.customersUpdateForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch('customer/updateCustomer', this.customersUpdateForm)
            .then(() => {
              this.resetCreateCustomersForm()
              this.handleTab('view')
            })
            .catch(() => {
              console.log('Update customer error')
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
      this.getCustomers()
    },

    async deleteCustomer(data) {
      console.log('delete', data)
      this.$store
        .dispatch('customer/deleteCustomer', data)
        .then(() => {
          this.handleTab('view')
        })
        .catch(() => {
          console.log('Delete customer error')
        })
    },

    handleAvatarSuccess(res, file) {
      console.log('Image Upload')
      this.customersCreateForm.imageUrl = URL.createObjectURL(file.raw)
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

import { getBranchList } from '@/api/branch'
export const User = {
  name: 'Index',
  data() {
    const validateBranch = (rule, value, callback) => {
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
      branchData: [],
      totalCount: 0,
      branchCreateForm: {
        code: '',
        name: '',
        phone: '',
        address: ''
      },
      searchValue: '',
      branchRule: {
        code: [{ required: true, validator: validateBranch }],
        name: [{ required: true, validator: validateBranch }],
        phone: [{ required: true, validator: validateBranch }],
        address: [{ required: true, validator: validateBranch }]
      }
    }
  },
  created() {
    this.getBranch()
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
        this.getBranch()
      }
      if (this.activeName === 'create') {
        this.resetUpdateBranchForm()
      }
    },

    resetCreateBranchForm() {
      this.branchCreateForm.name = ''
      this.branchCreateForm.phone = ''
      this.branchCreateForm.address = ''
    },

    resetUpdateBranchForm() {
      this.branchCreateForm.code = ''
      this.branchCreateForm.name = ''
      this.branchCreateForm.phone = ''
      this.branchCreateForm.address = ''
    },

    async getBranch() {
      const params = {
        group: '',
        sort: '',
        cur_page: this.pageIndex,
        per_page: this.pageSize,
        q: this.searchValue ? this.searchValue : ''
      }

      this.listLoading = true
      getBranchList(params).then(response => {
        this.branchData = response.data
        this.pageIndex = response.meta.curPage
        this.pageSize = response.meta.perPage
        this.totalCount = response.meta.totalResults
        this.listLoading = false
        console.log('request', params)
        console.log('Branch data', response)
      })
    },

    async createBranch() {
      this.$refs.branchCreateForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch('branch/createBranch', this.branchCreateForm)
            .then(() => {
              this.handleTab('view')
            })
            .catch(() => {
              console.log('Create branch error')
            })
        }
      })
    },

    updateBranch(row) {
      this.handleTab('update')
      this.branchCreateForm = row
      console.log('Update branch =>', this.branchCreateForm)
    },

    async updateBranchOk() {
      this.$refs.branchCreateForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch('branch/updateBranch', this.branchCreateForm)
            .then(() => {
              this.resetCreateBranchForm()
              this.handleTab('view')
            })
            .catch(() => {
              console.log('Update branch error')
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

    async deleteBranch(data) {
      console.log('delete', data)
      this.$store
        .dispatch('branch/deleteBranch', data)
        .then(() => {
          this.handleTab('view')
        })
        .catch(() => {
          console.log('Delete branch error')
        })
    },

    handleAvatarSuccess(res, file) {
      console.log('Image Upload')
      this.branchCreateForm.imageUrl = URL.createObjectURL(file.raw)
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
    },

    toUpperCaseWord(object, key) {
      const upperWord = object[key].toUpperCase()
      object[key] = upperWord
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

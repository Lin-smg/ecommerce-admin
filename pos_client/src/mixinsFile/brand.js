import { getBrandList } from '@/api/brand'
export const Brand = {
  data() {
    const validateBrand = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Invalid input'))
      } else {
        callback()
      }
    }
    return {
      pageSize: 10,
      pageIndex: 1,
      dialog: {
        visible: false,
        title: ''
      },
      searchValue: '',
      brand: {
        brandCode: '',
        brandName: '',
        description: ''
      },
      brandData: [],
      listLoading: false,
      brandRule: {
        brandCode: [
          { required: true, trigger: 'blur', validator: validateBrand }
        ],
        brandName: [
          { required: true, trigger: 'blur', validator: validateBrand }
        ],
        description: [
          { required: true, trigger: 'blur', validator: validateBrand }
        ]
      }
    }
  },
  created() {
    this.getBrand()
  },
  methods: {
    showDialog(key, data) {
      this.dialog.visible = true
      if (key === 'add') {
        this.dialog.title = 'Add'
        this.brand = {
          brandCode: '',
          brandName: '',
          description: ''
        }
      } else {
        this.dialog.title = 'Edit'
        this.brand = data
      }
    },

    async deleteBrand(data) {
      console.log('delete', data)
      this.$store
        .dispatch('brand/deleteBrand', data)
        .then(() => {
          this.getBrand()
        })
        .catch(() => {
          console.log('Delete brand error')
        })
    },

    onPageSizeChange(val) {
      this.pageSize = val
    },

    onPageIndexChange(val) {
      this.pageIndex = val
    },

    async getBrand() {
      const params = {
        group: '',
        sort: '',
        cur_page: this.pageIndex,
        per_page: this.pageSize,
        q: this.searchValue ? this.searchValue : ''
      }

      this.listLoading = true
      getBrandList(params).then(response => {
        this.brandData = response.data
        this.pageIndex = response.meta.curPage
        this.pageSize = response.meta.perPage
        this.totalCount = response.meta.totalResults
        this.listLoading = false
        this.dialog.visible = false
        console.log('request', params)
        console.log('Brand data', response)
      })
    },

    async createOrUpdateBrand(key) {
      this.$refs.brand.validate(valid => {
        if (valid) {
          console.log('Data =>', this.brand)

          if (key === 'Add') {
            this.$store
              .dispatch('brand/createBrand', this.brand)
              .then(() => {
                this.resetBrand()
              })
              .catch(() => {
                console.log('Create brand error')
              })
          }
          if (key === 'Edit') {
            this.$store
              .dispatch('brand/updateBrand', this.brand)
              .then(() => {
                this.resetBrand()
                this.handleTab('view')
              })
              .catch(() => {
                console.log('Update brand error')
              })
          }
        }
      })
    },

    resetBrand() {
      this.getBrand()
      this.brand.brandCode = ''
      this.brand.brandName = ''
      this.brand.description = ''
    },

    toUpperCaseWord(object, key) {
      const upperWord = object[key].toUpperCase()
      object[key] = upperWord
    }
  }
}

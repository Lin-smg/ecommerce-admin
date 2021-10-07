import { getMainCategory } from '@/api/mainCategory'

export const MainCategory = {
  data() {
    return {
      pageSize: 10,
      pageIndex: 1,
      dialog: {
        visible: false,
        title: ''
      },
      searchValue: '',
      category: this.initCategory(),
      categoryData: [],
      isUpdate: false
    }
  },
  created() {
    this.getMainCategory()
  },
  methods: {
    initCategory() {
      return {
        categoryCode: '',
        categoryName: '',
        description: ''
      }
    },
    async getMainCategory() {
      const params = {
        group: '',
        sort: '',
        cur_page: this.pageIndex,
        per_page: this.pageSize,
        q: this.searchValue ? this.searchValue : ''
      }

      this.listLoading = true
      await getMainCategory(params).then(response => {
        this.categoryData = response.data
        this.pageIndex = response.meta.curPage
        this.pageSize = response.meta.perPage
        this.totalCount = response.meta.totalResults
        this.category = this.initCategory()
        this.listLoading = false
      })
    },
    createCategory() {
      if (this.isUpdate) {
        this.$store.dispatch('mainCategory/updateMainCategory', this.category)
          .then(() => {
            this.dialog.visible = false
            this.getMainCategory()
          })
          .catch(() => {
            console.log('Update Category error')
          })
      } else {
        this.$store.dispatch('mainCategory/createMainCategory', this.category)
          .then(() => {
            this.dialog.visible = false
            this.getMainCategory()
          })
          .catch(() => {
            console.log('Create Category error')
          })
      }
    },
    showDialog(key, data) {
      this.dialog.visible = true
      if (key === 'add') {
        this.isUpdate = false
        this.dialog.title = 'Add'
        this.category = {
          categoryCode: '',
          categoryName: '',
          description: ''
        }
      } else {
        this.isUpdate = true
        this.dialog.title = 'Edit'
        this.category = data
      }
    },
    searchClick() {
      this.getMainCategory()
    },

    deleteCategory(data) {
      this.$store.dispatch('mainCategory/deleteMainCategory', data)
        .then(() => {
          this.getMainCategory()
        })
        .catch(() => {
          console.log('delete error')
        })
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.getMainCategory()
    },

    handleCurrentChange(val) {
      this.pageIndex = val
      this.getMainCategory()
    }
  }

}

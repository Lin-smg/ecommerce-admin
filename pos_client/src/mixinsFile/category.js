import { getCategory } from '@/api/category'

export const Category = {
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
    this.getCategory()
  },
  methods: {
    initCategory() {
      return {
        categoryCode: '',
        categoryName: '',
        description: ''
      }
    },
    async getCategory() {
      const params = {
        group: '',
        sort: '',
        cur_page: this.pageIndex,
        per_page: this.pageSize,
        q: this.searchValue ? this.searchValue : ''
      }

      this.listLoading = true
      await getCategory(params).then(response => {
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
        this.$store.dispatch('category/updateCategory', this.category)
          .then(() => {
            this.dialog.visible = false
            this.getCategory()
          })
          .catch(() => {
            console.log('Create supplier error')
          })
      } else {
        this.$store.dispatch('category/createCategory', this.category)
          .then(() => {
            this.dialog.visible = false
            this.getCategory()
          })
          .catch(() => {
            console.log('Create supplier error')
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

    deleteCategory(data) {
      this.$store.dispatch('category/deleteCategory', data)
        .then(() => {
          this.getCategory()
        })
        .catch(() => {
          console.log('delete error')
        })
    },

    onPageSizeChange(val) {
      this.pageSize = val
    },

    onPageIndexChange(val) {
      this.pageIndex = val
    }
  }

}

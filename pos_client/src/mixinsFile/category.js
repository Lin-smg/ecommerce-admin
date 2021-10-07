import { getCategory } from '@/api/category'
import { getMainCategory } from '@/api/mainCategory'

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
      mainCategoryList: [],
      isUpdate: false
    }
  },
  created() {
    this.getMainCategory()
    this.getCategory()
  },
  methods: {
    initCategory() {
      return {
        categoryCode: '',
        categoryName: '',
        description: '',
        mainCategoryCode: ''
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
        this.mainCategoryList = response.data
      })
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

        console.log('cateory', this.categoryData)
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
    searchClick() {
      this.getCategory()
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

    handleSizeChange(val) {
      this.pageSize = val
      this.getCategory()
    },

    handleCurrentChange(val) {
      this.pageIndex = val
      this.getCategory()
    }
  }

}

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
      category: {
        categoryCode: '',
        categoryName: '',
        description: ''
      },
      categoryData: [
        {
          categoryCode: 'C001',
          categoryName: 'category1',
          description: 'description'
        },
        {
          categoryCode: 'C002',
          categoryName: 'category1',
          description: 'description'
        }
      ],
      dialogVisible: false
    }
  },
  methods: {
    showDialog(key, data) {
      this.dialog.visible = true
      if (key === 'add') {
        this.dialog.title = 'Add'
        this.category = {
          categoryCode: '',
          categoryName: '',
          description: ''
        }
      } else {
        this.dialog.title = 'Edit'
        this.category = data
      }
    },

    deleteCategory(data) {
      console.log(data)
    },

    onPageSizeChange(val) {
      this.pageSize = val
    },

    onPageIndexChange(val) {
      this.pageIndex = val
    }
  }

}

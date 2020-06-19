export const Brand = {
  data() {
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
      brandData: [
        {
          brandCode: 'B001',
          brandName: 'brand1',
          description: 'description'
        },
        {
          brandCode: 'B002',
          brandName: 'brand1',
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

    deletebrand(data) {
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

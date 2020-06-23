import { getProductList, deletePhoto, getPKGWithSmallestUnit } from '@/api/product'
export const Product = {
  data() {
    return {
      activeName: 'view',
      searchValue: '',
      categoryList: [],
      brandList: [],
      unitList: [],
      packageUnitList: [],
      createProductForm: this.initProductForm(),
      updateProductForm: this.initProductForm(),
      productData: [],
      imageUrl: '',
      imageUploadUrl: '',
      oldFileName: '',
      baseUrl: process.env.VUE_APP_BASE_API,
      selectedUnit: '',
      selectedCategory: '',
      selectedBrand: '',
      rules: {
        productCode: [
          { required: true, message: 'Please input Product Code', trigger: 'blur' }
          // ,{ min: 5,message: 'Length should be minium 5', trigger: 'blur' }
        ],
        productName: [
          { required: true, message: 'Please input Product Name', trigger: 'blur' },
          { min: 5, message: 'Length should be minium 5', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.imageUploadUrl = this.baseUrl + '/shared/productIMG'
    this.getProductList()
  },
  methods: {
    initProductForm() {
      return {
        productCode: '',
        productName: '',
        categoryCode: '',
        categoryName: '',
        brandCode: '',
        brandName: '',
        expDate: null,
        unitId: null,
        unitName: '',
        unitPrice: 0,
        description: '',
        reOrder: 0,
        taxPercent: 0,
        imgPath: '',
        unit: []
      }
    },
    async changeSelectedUnit() {
      this.listLoading = true
      const id = this.selectedUnit.id
      await getPKGWithSmallestUnit(id).then(response => {
        this.packageUnitList = []
        this.createProductForm.unit = []
        for (const obj of response.data) {
          const data = {
            id: obj.id,
            unitName: obj.unitName,
            childUnitId: obj.childUnitId,
            childUnitName: obj.childUnitName
          }
          if (data.id === this.selectedUnit.id) {
            this.createProductForm.unit.push(data)
          }
          this.packageUnitList.push(data)
        }
        this.listLoading = false
      })
    },
    async getProductList() {
      const params = {
        group: '',
        sort: '',
        cur_page: this.pageIndex,
        per_page: this.pageSize,
        q: this.searchValue ? this.searchValue : ''
      }

      this.listLoading = true
      await getProductList(params).then(response => {
        this.createProductForm = this.initProductForm()
        this.updateProductForm = this.initProductForm()
        this.selectDeptObject = ''
        this.imageUrl = ''
        this.productData = []
        this.packageUnitList = []
        this.categoryList = response.categorys
        this.brandList = response.brands
        this.unitList = response.units
        this.pageIndex = response.meta.curPage
        this.pageSize = response.meta.perPage
        this.totalCount = response.meta.totalResults
        this.productData = response.data
        this.listLoading = false
      })
    },

    searchClick() {
      this.getProductList()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getProductList()
    },

    handleCurrentChange(val) {
      this.pageIndex = val
      this.getProductList()
    },

    // ///
    handleAvatarSuccess(res, file) {
      if (this.oldFileName !== '') {
        deletePhoto({ fileName: `./files/${this.oldFileName}` })
      }
      this.oldFileName = res.filename
      this.createProductForm.imgPath = `/shared/${res.filename}`
      this.createProductForm.imgPath = `/shared/${res.filename}`
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
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

    // //
    handleTab(tab) {
      if (tab === 'view') {
        this.createProductForm = this.initProductForm()
        this.getProductList()
      }
      this.activeName = tab
    },

    createOk() {
      this.$refs.createForm.validate(valid => {
        if (valid) {
          this.createProductForm.unitId = this.selectedUnit.id
          this.createProductForm.unitName = this.selectedUnit.unitName
          this.createProductForm.categoryCode = this.selectedCategory.categoryCode
          this.createProductForm.categoryName = this.selectedCategory.categoryName
          this.createProductForm.brandCode = this.selectedBrand.brandCode
          this.createProductForm.brandName = this.selectedBrand.brandName
          this.loading = true
          this.$store.dispatch('product/createProduct', this.createProductForm).then(() => {
            this.handleTab('view')
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
    createReset() {

    },

    updateOk() {

    },
    updateReset() {

    },

    editClick(data) {
      this.handleTab('update')
      this.product = data
    },

    deleteProduct(data) {

    }
  }
}

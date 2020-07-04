import { getProductList, deletePhoto, getPKGWithSmallestUnit, getAllProductList, getProductListWithSupplier } from '@/api/product'
import { getSupplierList } from '@/api/supplier'
import { parseTime } from '@/utils'
import { Message } from 'element-ui'
export const Product = {
  data() {
    return {
      activeName: 'view',
      searchValue: '',
      categoryList: [],
      brandList: [],
      unitList: [],
      packageUnitList: [],
      supplierList: [],
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
      selectedSupplier: '',
      timeout: null,
      selectedUnitForUpdate: [],
      listLoading: true,
      downloadLoading: false,
      filename: 'productList',
      autoWidth: true,
      bookType: 'xlsx',
      exportList: [],
      supplierDialogVisible: false,
      suppliersCreateForm: this.resetCreateSupplierForm(),
      rules: {
        productCode: [
          { required: true, message: 'Please input Product Code', trigger: 'blur' }
          // ,{ min: 5,message: 'Length should be minium 5', trigger: 'blur' }
        ],
        productName: [
          { required: true, message: 'Please input Product Name', trigger: 'blur' },
          { min: 5, message: 'Length should be minium 5', trigger: 'blur' }
        ]
      },
      supplierRule: {
        name: [{ required: true, message: 'Please input Name', trigger: 'blur' }],
        email: [{ type: 'email', message: 'Please input Email', trigger: 'blur' }],
        phone: [{ required: true, message: 'Please input Phone', trigger: 'blur' }],
        addressOne: [{ required: true, message: 'Please input Address', trigger: 'blur' }]

      }
    }
  },
  created() {
    this.imageUploadUrl = this.baseUrl + '/shared/productIMG'
    this.getProductList()
    if (this.$route.query.data === 'add') {
      this.activeName = 'add'
    }
  },
  computed: {
    getTab() {
      return this.$store.getters.newTab
    }
  },
  watch: {
    getTab() {
      console.log('tab', this.$store.getters.newTab)
    }
  },
  methods: {
    supplierCancel() {
      this.supplierDialogVisible = false
    },
    newSupplier() {
      this.suppliersCreateForm = this.resetCreateSupplierForm()
      this.supplierDialogVisible = true
    },
    async createSupplier() {
      this.$refs.suppliersCreateForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch('supplier/createSupplier', this.suppliersCreateForm)
            .then(() => {
              // this.handleTab('view')
              this.supplierDialogVisible = false
            })
            .catch(() => {
              console.log('Create supplier error')
            })
        }
      })
    },

    resetCreateSupplierForm() {
      return {
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
      }
    },

    async exportExcelProductList() {
      await getAllProductList().then(response => {
        var i = 1
        for (const obj of response.data) {
          obj.count = i
          this.exportList.push(obj)
          i = i + 1
        }
      })
    },
    async exportExcelProductListWithSupplier() {
      await getProductListWithSupplier(this.createProductForm.supplierId).then(response => {
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
      this.exportList = []
      if (this.createProductForm.supplierId !== null &&
        this.createProductForm.supplierName !== ''
      ) {
        await this.exportExcelProductListWithSupplier()
      } else {
        await this.exportExcelProductList()
      }

      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['No', 'Product Code', 'Product Name', 'Description', 'Package Size', 'Type', 'Supplier', 'Category', 'Brand', 'Unit', 'Unit Price', 'Quantity', 'Expire Date']
        const filterVal = ['count', 'productCode', 'productName', 'description', 'packageSize', 'type', 'supplierName', 'categoryName', 'brandName', 'unitName', 'unitPrice', 'productQty', 'expDate']
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
    productQtyReOrder({ row, rowIndex }) {
      if (row.unitQty <= row.reOrder) {
        return 'row-color'
      }
      return ''
    },
    async querySearchAsync(queryString, cb) {
      const params = {
        group: '',
        sort: 'productQty',
        cur_page: this.pageIndex,
        per_page: this.pageSize,
        q: queryString || ''
      }

      await getSupplierList(params).then(response => {
        var results = response.data
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          cb(results)
        }, 500 * Math.random())
      })
    },
    handleSelect(item) {
      this.createProductForm.supplierId = item.id
      this.createProductForm.supplierName = item.name
      this.selectedSupplier = item.name
    },
    handleClear() {
      this.createProductForm.supplierId = null
      this.createProductForm.supplierName = ''
    },
    handleClearForUpdate() {
      this.updateProductForm.supplierId = null
      this.updateProductForm.supplierName = ''
    },
    handleSelectForUpdate(item) {
      this.updateProductForm.supplierId = item.id
      this.updateProductForm.supplierName = item.name
      this.selectedSupplier = item.name
    },
    initProductForm() {
      return {
        id: null,
        productCode: '',
        productName: '',
        categoryCode: '',
        categoryName: '',
        brandCode: '',
        brandName: '',
        expDate: null,
        unitId: null,
        unitName: '',
        supplierId: null,
        supplierName: '',
        unitPrice: 0,
        unitCost: 0,
        productQty: 0,
        description: '',
        reOrder: 0,
        taxPercent: 0,
        imgPath: '',
        unit: []
      }
    },
    async getSupplierList() {
      this.listLoading = true
      await getSupplierList().then(response => {
        this.supplierList = response.data
        this.listLoading = false
      })
    },
    async changeSelectedUnit() {
      this.listLoading = true
      const id = this.selectedUnit.id
      await getPKGWithSmallestUnit(id).then(response => {
        this.packageUnitList = []
        this.createProductForm.unit = []
        for (const obj of response.data) {
          if (this.activeName === 'add') {
            this.createProductForm.unit.push(obj)
          }
          // this.packageUnitList.push(obj)
        }
        this.listLoading = false
      })
    },
    async changeSelectedUnitForUpdate() {
      this.listLoading = true
      const id = this.selectedUnit.id
      await getPKGWithSmallestUnit(id).then(response => {
        for (var obj of response.data) {
          var editData = this.selectedUnitForUpdate.find(x => x.unitId === obj.id)
          if (editData) {
            obj = editData
          } else {
            obj.unitId = obj.id
            obj.id = null
          }

          this.updateProductForm.unit.push(obj)
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
      this.updateProductForm.imgPath = `/shared/${res.filename}`
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
      if (tab === 'view' || tab === 'add') {
        this.createProductForm = this.initProductForm()
        this.selectedUnit = ''
        this.selectedCategory = ''
        this.selectedBrand = ''
        this.selectedSupplier = ''
        this.imageUrl = ''
        this.getProductList()
      }
      this.activeName = tab
    },

    createOk() {
      this.$refs.createForm.validate(valid => {
        if (this.createProductForm.unit.length === 0) {
          Message({
            message: 'Please select unit',
            type: 'error',
            duration: 5 * 1000
          })
          return false
        }
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
      this.$refs['createForm'].resetFields()
      this.createProductForm = this.initProductForm()
      this.selectedUnit = ''
      this.selectedCategory = ''
      this.selectedBrand = ''
      this.selectedSupplier = ''
      this.imageUrl = ''
    },

    updateOk() {
      this.$refs.updateForm.validate(valid => {
        if (this.updateProductForm.unit.length === 0) {
          Message({
            message: 'Please select unit',
            type: 'error',
            duration: 5 * 1000
          })
          return false
        }
        if (valid) {
          this.loading = true
          this.updateProductForm.unitId = this.selectedUnit.id
          this.updateProductForm.unitName = this.selectedUnit.unitName
          this.updateProductForm.categoryCode = this.selectedCategory.categoryCode
          this.updateProductForm.categoryName = this.selectedCategory.categoryName
          this.updateProductForm.brandCode = this.selectedBrand.brandCode
          this.updateProductForm.brandName = this.selectedBrand.brandName
          this.$store.dispatch('product/updateProductData', this.updateProductForm).then(() => {
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
    updateReset() {
      this.handleTab('view')
    },

    async editClick(data) {
      this.handleTab('update')
      this.selectedUnitForUpdate = data.unit
      this.updateProductForm = data
      this.selectedCategory = {
        categoryCode: data.categoryCode,
        categoryName: data.categoryName
      }
      this.selectedBrand = {
        brandCode: data.brandCode,
        brandName: data.brandName
      }
      this.selectedSupplier = data.supplierName
      this.selectedUnit = {
        id: data.unitId,
        unitName: data.unitName
      }
      this.imageUrl = this.baseUrl + data.imgPath
      if (data.imgPath !== '') {
        this.oldFileName = data.imgPath.substring(data.imgPath.lastIndexOf('/'))
      } else {
        this.oldFileName = ''
      }
      this.updateProductForm.unit = []
      this.changeSelectedUnitForUpdate()
    },
    deleteProduct(data) {
      this.$store.dispatch('product/deleteProduct', data).then(() => {
        this.handleTab('view')
        this.loading = false
      }).catch(() => {
        this.loading = false
        return false
      })
    }
  }
}


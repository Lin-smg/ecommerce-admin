import { getCategory } from '@/api/category'
import { getBrandList } from '@/api/brand'
import { getSupplierList } from '@/api/supplier'
import { getProductList, getPOSProductList } from '@/api/product'
import { savePurchaseData } from '@/api/purchase'
import { getWarehouseList } from '@/api/warehouse'

export const Purchase = {
  data: function() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      device: this.$store.state.app.device,
      pos: 'pos',
      searchProduct: '',
      selectedSupplier: '',
      searchCategory: '',
      searchBrand: '',
      supplier: '',
      saveSupplierData: {
        id: null,
        name: ''
      },
      warehouseList: [],
      today: new Date().toLocaleString(),
      num: 0,
      name: '',
      amount: 0,
      itemList: [],
      categoryList: [],
      brandList: [],
      dialogVisible: false,
      popVisible: false,
      selectedItemList: [],
      selectedItem: '',
      catActive: '',
      total: 0,
      OtherChargeTotal: 0,
      discount: 0,
      tax: 0,
      supplierCreateVisible: false,
      warehouseListVisible: false,
      suppliersCreateForm: this.supplierFormInit(),
      savePurchaseData: '',
      print: false,
      printInvoiceData: '',
      supplierRule: {
        name: [{ required: true, message: 'Please input Name', trigger: 'blur' }],
        email: [{ type: 'email', message: 'Please input Email', trigger: 'blur' }],
        phone: [{ required: true, message: 'Please input Phone', trigger: 'blur' }],
        addressOne: [{ required: true, message: 'Please input Address', trigger: 'blur' }]

      }
    }
  },
  created() {
    const self = this
    this.getCategory()
    this.productAutoCompleteSearch()
    self.$store.dispatch('app/setBackHandle', true)
    window.onpopstate = function() {
      localStorage.setItem('back', true)
    }
  },
  methods: {
    // From Supplier Select
    supplierFormInit() {
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
    supplierCreateFormShow() {
      this.suppliersCreateForm = this.supplierFormInit()
      this.supplierCreateVisible = true
    },
    clearSupplierForm() {
      this.supplierCreateVisible = false
    },
    handleClearFromSupplier() {
      this.saveSupplierData.id = null
      this.saveSupplierData.name = ''
    },
    handleSelectFromSupplier(item) {
      this.saveSupplierData.id = item.id
      this.saveSupplierData.name = item.name
      this.supplier = item.name
    },
    // Promo Status
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.promoStatus = !status
    },
    // Supplier List For Search
    async querySearchAsync(queryString, cb) {
      const params = {
        group: '',
        sort: '',
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
    handleSelectSupplier(item) {
      this.selectedSupplier = item.name
      this.searchClick()
    },
    handleClear() {
      this.selectedSupplier = ''
    },
    // Product
    async productAutoCompleteSearch() {
      const params = {
        product: this.searchProduct ? this.searchProduct : '',
        supplier: this.selectedSupplier ? this.selectedSupplier : '',
        category: this.searchCategory ? this.searchCategory : ''
      }
      await getPOSProductList(params).then(response => {
        this.itemList = response.data
        // console.log(this.itemList)
      })
    },
    // Print
    printData() {
      // this.sendPrintData()
      this.$htmlToPaper('printMe')
    },
    // Save and Print
    async savePurchase() {
      this.savePurchaseData = {
        invoiceNo: '',
        registerNo: '',
        supplierId: this.saveSupplierData.id,
        supplierName: this.saveSupplierData.name,
        date: new Date(),
        casherName: this.$store.getters.curUserInfo.username,
        total: this.total,
        status: '',
        remark: '',
        purchaseItemsList: this.selectedItemList
      }
      if (this.savePurchaseData.purchaseItemsList.length === 0) {
        this.$message({
          message: 'Please select unit',
          type: 'error',
          duration: 5 * 1000
        })
        return false
      }
      this.loading = true
      await savePurchaseData(this.savePurchaseData).then(response => {
        this.loading = false
        this.selectedItemList = []
        this.printInvoiceData = response.data
        this.print = true
      }).catch((error) => {
        this.$message({
          message: error,
          type: 'error',
          duration: 5 * 1000
        })
        this.loading = false
      })
      // this.$store.dispatch('purchase/savePurchaseData', this.savePurchaseData).then((response) => {
      //   this.loading = false
      //   this.selectedItemList = []
      //   this.printInvoiceData = response.data
      //   this.print = true
      // }).catch(() => {
      //   this.loading = false
      // })
    },
    printClick() {
      this.print = true
      // Pass the element id here
      // this.$htmlToPaper('printMe');
    },
    // Add Purchase Product
    async setPurchaseItem(item) {
      // item.promoStatus = true
      // item.qty = 1
      const selected = { ...item,
        promoStatus: true,
        qty: 1,
        promoQty: 0,
        expDate: this.selectedItem.expDate
      }
      var exists = await this.selectedItemList.some(function(field) {
        var flag = field.id === selected.id
        if (flag) {
          field.qty += 1
        }
        return flag
      })
      if (!exists) {
        this.selectedItemList.push(selected)
      }
      this.dialogVisible = false
      console.log('selectitem', selected)
      this.setTotal()
    },

    catOver(i) {
      this.catActive = i
    },
    preCat() {
      var cat = document.getElementById('cat')
      cat.scrollLeft -= 200
    },

    nextCat() {
      var cat = document.getElementById('cat')
      cat.scrollLeft += 200
    },

    chooseCatecory(data) {
      // console.log('categor', data)
    },

    popShow(data) {
      this.selectedItem = data
      if (data.unit.length > 1) {
        this.dialogVisible = true
      } else {
        this.setPurchaseItem(data.unit[0])
      }
    },

    removeItem(i) {
      this.selectedItemList.splice(i, 1)
    },

    setTotal() {
      this.total = 0
      for (const i of this.selectedItemList) {
        this.total += (parseFloat(i.unitCost) * i.qty)
      }
    },

    async getCategory() {
      const params = {
      }
      await getCategory(params).then(response => {
        this.categoryList = response.data
      })
    },

    async getAllProduct() {
    },

    async supplierSearch(q, cb) {
      const params = {
        q: q
      }
      await getSupplierList(params).then(response => {
        this.customersData = response.data
        cb(response.data)
      })
    },

    async productSearch(q, cb) {
      const params = {
        q: q
      }

      this.listLoading = true
      await getProductList(params).then(response => {
        // this.itemList = response.data
        cb(response.data)
      })
    },
    async categorySearch(q, cb) {
      const params = {
        q: q
      }
      await getCategory(params).then(response => {
        this.categoryList = response.data
        cb(response.data)
      })
    },
    async brandSearch(q, cb) {
      const params = {
        q: q
      }
      await getBrandList(params).then(response => {
        this.brandList = response.data
        cb(response.data)
      })
    },
    async createSupplier() {
      this.$refs.suppliersCreateForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch('supplier/createSupplier', this.suppliersCreateForm)
            .then(() => {
              // this.handleTab('view')
              this.supplierCreateVisible = false
            })
            .catch(() => {
              console.log('Create supplier error')
            })
        }
      })
    },

    setBackHandle() {

    },
    // Product
    async searchClick() {
      this.itemList = []
      const params = {
        product: this.searchProduct ? this.searchProduct : '',
        supplier: this.selectedSupplier ? this.selectedSupplier : '',
        category: this.searchCategory ? this.searchCategory : ''
      }
      await getPOSProductList(params).then(response => {
        this.itemList = response.data
        console.log(this.itemList)
      })
    },
    addOtherCharges() {
      console.log(this.popVisible)
      if (!this.otherCharge.name) {
        return
      }
      this.popVisible = false
      this.otherChargesList.push({ name: this.otherCharge.name, amount: this.otherCharge.amount })
      this.otherCharge.name = ''
      this.otherCharge.amount = 0
      console.log(this.otherCharge.name)
      this.setOtherTotal()
    },
    setOtherTotal() {
      this.OtherChargeTotal = 0
      for (const i of this.otherChargesList) {
        this.OtherChargeTotal += parseFloat(i.amount)
      }
      console.log('othertotal', this.OtherChargeTotal)
    },
    otherChargeDelete(data) {
      this.otherChargesList.splice(this.otherChargesList.indexOf(data), 1)
      this.setOtherTotal()
    },

    showWarehouse(item) {
      this.warehouseListVisible = true
      this.warehouseList = []
      this.getWarehouse(item)
    },

    async getWarehouse(item) {
      const params = {
      }
      await getWarehouseList(params).then(response => {
        const list = response.data
        for (const i in list) {
          const ware = {
            ...list[i],
            qty: i === '0' ? item.qty + Number(item.promoQty) : 0,
            productCode: item.productCode,
            productName: item.productName
          }
          this.warehouseList.push(ware)
        }

        console.log(this.warehouseList)
      })
    },
    saveWarehouse() {
      this.warehouseListVisible = false
      console.log('save warehouse', this.warehouseList)
    }
  }
}

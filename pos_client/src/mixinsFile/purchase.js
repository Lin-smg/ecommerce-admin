import { getCategory } from '@/api/category'
import { getBrandList } from '@/api/brand'
import { getSupplierList } from '@/api/supplier'
import { getProductList,getPOSProductList } from '@/api/product'

export const Purchase = {
  data: function() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      device: this.$store.state.app.device,
      pos: 'pos',
      searchProduct: '',
      searchCategory: '',
      searchBrand: '',
      searchType: '',
      today: new Date().toLocaleString(),
      supplier: '',
      customerData: '',
      num: 0,
      otherChargesList: [],
      otherCharge: {
        name: '',
        amount: 0
      },
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
      supplierCreateForm: {
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
      },
      printDataValue: {
        invoiceId: Date.now(),
        customer: '',
        date: '',
        time: '',
        casher: '',
        soldItemsList: [],
        otherChargesList: [],
        tax: 0,
        discount: 0,
        subTotal: 0,
        grandTotal: 0,
        otherCharges: 0
      },

      print: false,
    }
  },
  created() {
    const self = this
    this.getCategory()
    this.getProductList()
    self.$store.dispatch('app/setBackHandle', true)
    window.onpopstate = function() {
      localStorage.setItem('back', true)
    }
  },
  methods: {
    printData() {
      this.sendPrintData()
      this.$htmlToPaper('printMe')
    },
    sendPrintData() {
      this.printDataValue = {
        invoiceId: Date.now(),
        date: this.today.split(',')[0],
        time: this.today.split(',')[1],
        customer: this.customerData,
        casher: this.$store.getters.curUserInfo,
        soldItemsList: this.selectedItemList,
        otherChargesList: this.otherChargesList,
        tax: this.tax,
        discount: this.discount,
        subTotal: this.total,
        otherCharges: this.OtherChargeTotal,
        grandTotal: (this.total + this.OtherChargeTotal) + (this.total + this.OtherChargeTotal) * (this.tax / 100) - this.discount
      }
      console.log('print data', this.printDataValue)
      this.$store
        .dispatch('customer/createCustomer', this.printDataValue)
        .then(() => {
          this.print = false
        })
        .catch(() => {
          console.log('print Error')
        })
    },
    printClick() {
      this.print = true
      // Pass the element id here
      // this.$htmlToPaper('printMe');
    },

    async getProductList() {
      const params = {
        product: this.searchProduct ? this.searchProduct : '',
        brand: this.searchBrand ? this.searchBrand : '',
        category: this.searchCategory ? this.searchCategory : ''
      }
      await getPOSProductList(params).then(response => {
        this.itemList = response.data
        console.log('PRODUCT LIST => ', this.itemList)
      })
    },

    setPurchaseItem(item) {
      const selected = {
        data: item,
        tax: this.selectedItem.taxPercent,
        count: 1
      }
      var exists = this.selectedItemList.some(function(field) {
        var flag = field.data.id === selected.data.id
        if (flag) {
          field.count += 1
        }
        return flag
      })
      if (!exists) {
        this.selectedItemList.push(selected)
      }
      console.log('selected item', selected)
      console.log('selectedItemList', this.selectedItemList)

      //this.setTotal()
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
      //console.log('categor', data)
    },

    popShow(data) {
      this.selectedItem = data
      this.dialogVisible = true
    },

    removeItem(i) {
      this.selectedItemList.splice(i, 1)
    },

    setTotal() {
      this.total = 0
      for (const i of this.selectedItemList) {
        this.total += (parseFloat(i.data.sellPrice) * i.count) + ((parseFloat(i.data.sellPrice) * i.count) * i.tax / 100)
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
      this.$store
        .dispatch('supplier/createSupplier', this.customersCreateForm)
        .then(() => {
          this.customerCreateVisible = false
        })
        .catch(() => {
          console.log('Create customer error')
        })
    },

    resetCreateCustomersForm() {
      this.customersCreateForm.name = ''
      this.customersCreateForm.email = ''
      this.customersCreateForm.phone = ''
      this.customersCreateForm.imageUrl = ''
      this.customersCreateForm.addressOne = ''
      this.customersCreateForm.addressTwo = ''
      this.customersCreateForm.city = ''
      this.customersCreateForm.stateOrProvince = ''
      this.customersCreateForm.zipCode = ''
      this.customersCreateForm.country = ''
      this.customersCreateForm.comments = ''
      this.customersCreateForm.internalNotes = ''
      this.customersCreateForm.companyName = ''
      this.customersCreateForm.account = ''
    },
    setBackHandle() {

    },
    async searchClick() {
      console.log('rou', this.$route.name)

      const params = {
        product: this.searchProduct ? this.searchProduct : '',
        brand: this.searchBrand ? this.searchBrand : '',
        category: this.searchCategory ? this.searchCategory : ''
      }
      await getProductList(params).then(response => {
        this.itemList = response.data
        console.log(this.itemList)
      })
    },
    change(val) {
      console.log(val)
      console.log(this.categoryList[val])
    },
    handleSelect(val) {
      this.customerData = val
      this.supplier = val.name
      console.log(val)
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
    }
  }
}

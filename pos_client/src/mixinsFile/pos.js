import { getCategory } from '@/api/category'
import { getBrandList } from '@/api/brand'
import { getCustomerList } from '@/api/customer'
import { getProductList, getPOSProductList } from '@/api/product'
export const POS = {
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
      customer: 'walk-in',
      customerData: '',
      num: 0,
      otherChargesList: [],
      otherCharge: {
        name: '',
        amount: 0
      },
      name: '',
      amount: 0,
      itemList: [
        {
          code: 'code1',
          name: 'p1',
          type: 'type',
          price: 100
        },
        {
          code: 'code2',
          name: 'p2',
          type: 'type',
          price: 200
        },
        {
          code: 'code1',
          name: 'p1',
          type: 'type',
          price: 100
        },
        {
          code: 'code2',
          name: 'p2',
          type: 'type',
          price: 200
        }
      ],
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
      payAmount: 0,
      tax: 0,
      taxInclude: false,
      customerCreateVisible: false,
      netAmount: 0,
      dueDate: new Date(),
      customersCreateForm: {
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
        totalTax: 0,
        totalDiscount: 0,
        subTotal: 0,
        grandTotal: 0,
        otherCharges: 0,
        payAmount: 0,
        netAmount: 0
      },

      printOrder: false,
      printPay: false
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
    openNewTab(name) {
      // this.$store.dispatch('app/setNewTab', true)
      const routeData = this.$router.resolve({ name: name, query: { data: 'someData' }})
      window.open(routeData.href, '_blank')
    },
    setFocus(val) {
      this.$refs[val][0].focus()
    },
    printData() {
      this.sendPrintData()
      this.$htmlToPaper('printMe')
    },
    printOrderData() {
      this.sendOrderData()
      this.$htmlToPaper('printMe')
    },
    clearItemList() {
      this.selectedItemList = []
      this.otherChargesList = []
      this.setTotal()
      this.setOtherTotal()
    },
    sendOrderData() {
      this.printDataValue = {
        invoiceId: Date.now(),
        date: this.today.split(',')[0],
        time: this.today.split(',')[1],
        customer: this.customerData,
        casher: this.$store.getters.curUserInfo,
        soldItemsList: this.selectedItemList,
        otherChargesList: this.otherChargesList,
        totalTax: this.tax,
        totalDiscount: this.discount,
        subTotal: this.total,
        otherCharges: this.OtherChargeTotal,
        netAmount: this.netAmount,
        oldCreditAmount: this.oldCreditAmount,
        netTotalAmount: (this.netAmount + this.customerData.oldCreditAmount).toFixed(2),
        payAmount: this.payAmount,
        creditAmount: (this.netAmount + this.customerData.oldCreditAmount - this.payAmount).toFixed(2),
        changeAmount: (this.payAmount - (this.netAmount + this.customerData.oldCreditAmount).toFixed(2)).toFixed(2),
        dueDate: this.dueDate
      }
      console.log('pend data', this.printDataValue)
      this.$store
        .dispatch('pos/createPOSOrder', this.printDataValue)
        .then(() => {
          this.print = false
        })
        .catch(() => {
          console.log('print Error')
        })
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
        totalTax: this.tax,
        totalDiscount: this.discount,
        subTotal: this.total,
        otherCharges: this.OtherChargeTotal,
        netAmount: this.netAmount,
        oldCreditAmount: this.oldCreditAmount,
        netTotalAmount: (this.netAmount + this.customerData.oldCreditAmount).toFixed(2),
        payAmount: this.payAmount,
        creditAmount: (this.netAmount + this.customerData.oldCreditAmount - this.payAmount).toFixed(2),
        changeAmount: (this.payAmount - (this.netAmount + this.customerData.oldCreditAmount).toFixed(2)).toFixed(2)
      }
      console.log('print data', this.printDataValue)
      this.$store
        .dispatch('pos/createPOSPay', this.printDataValue)
        .then(() => {
          this.print = false
        })
        .catch(() => {
          console.log('print Error')
        })
    },
    printClick(state) {
      console.log(state)
      if (state === 1) {
        this.printPay = true
      } else {
        this.printOrder = true
      }
    },

    async getProductList() {
      const params = {
        q: this.searchProduct ? this.searchProduct : ''
      }

      this.listLoading = true
      await getProductList(params).then(response => {
        this.itemList = response.data
        console.log('product', this.itemList)
      })
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
      console.log('categor', data)
    },

    popShow(data) {
      this.selectedItem = data
      if (data.unit.length > 1) {
        this.dialogVisible = true
      } else {
        this.addSaleItem(data.unit[0])
      }
    },

    addSaleItem(item) {
      const selected = {
        data: item,
        tax: this.selectedItem.taxPercent,
        discount: 0,
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
      this.dialogVisible = false
      console.log('selectitem', selected)
      this.setTotal()
    },

    removeItem(i) {
      this.selectedItemList.splice(i, 1)
    },

    setTotal() {
      this.total = 0
      this.tax = 0
      for (const i of this.selectedItemList) {
        this.total += (parseFloat(i.data.sellPrice) * i.count - (i.count * parseFloat(i.data.sellPrice) * (i.discount / 100))) // + ((parseFloat(i.data.sellPrice) * i.count) * i.tax / 100)
        this.tax += (parseFloat(i.data.sellPrice) * i.tax / 100 * i.count)
      }

      this.netAmount = this.total + this.OtherChargeTotal + (this.taxInclude ? Number(this.tax) : 0) - this.discount
      this.payAmount = (this.netAmount + this.customerData.oldCreditAmount).toFixed(2)
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

    async customerSearch(q, cb) {
      const params = {
        q: q
      }
      await getCustomerList(params).then(response => {
        this.customersData = response.data
        cb(response.data)
      })
    },

    async productAutoCompleteSearch(q, cb) {
      const params = {
        q: q
      }

      this.listLoading = true
      await getProductList(params).then(response => {
        this.itemList = response.data
        // cb(response.data)
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
    async createCustomer() {
      this.$store
        .dispatch('customer/createCustomer', this.customersCreateForm)
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
      const params = {
        product: this.searchProduct ? this.searchProduct : '',
        brand: this.searchBrand ? this.searchBrand : '',
        category: this.searchCategory ? this.searchCategory : ''
      }
      await getPOSProductList(params).then(response => {
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
      this.customerData.oldCreditAmount = 100
      this.setTotal()
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
      this.setTotal()
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

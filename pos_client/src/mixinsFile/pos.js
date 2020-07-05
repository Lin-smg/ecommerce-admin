import { getCategory } from '@/api/category'
// import { getBrandList } from '@/api/brand'
import { getCustomerList } from '@/api/customer'
import { getSupplierList } from '@/api/supplier'
import { getPOSProductList } from '@/api/product'
import { createPOSOrder, createPOSPay, getCreditReceiptByCustomer } from '@/api/pos'
export const POS = {
  data: function() {
    return {
      baseUrl: process.env.VUE_APP_BASE_API,
      device: this.$store.state.app.device,
      pos: 'pos',
      selectedSupplier: '',
      searchProduct: '',
      searchCategory: '',
      searchBrand: '',
      searchType: '',
      today: new Date().toLocaleString(),
      customer: '',
      customerData: this.initCustomer(),
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
      payAmount: 0,
      tax: 0,
      taxInclude: false,
      customerCreateVisible: false,
      netAmount: 0,
      dueDate: new Date(),
      customersCreateForm: this.customerInitForm(),
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
      printOrderVaule: '',
      printSaleVaule: '',
      saveOrderData: '',
      printOrder: false,
      printPay: false,
      isCredit: false,
      creditAmountList: [],
      noStockdialogVisible: false
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
    initCustomer() {
      return {
        id: null,
        name: '',
        oldCreditAmount: 0
      }
    },
    customerInitForm() {
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
    // sendOrderData() {
    //   this.printDataValue = {
    //     receiptNo: Date.now(),
    //     date: this.today.split(',')[0],
    //     time: this.today.split(',')[1],
    //     customer: this.customerData,
    //     casher: this.$store.getters.curUserInfo,
    //     soldItemsList: this.selectedItemList,
    //     otherChargesList: this.otherChargesList,
    //     totalTax: this.tax,
    //     totalDiscount: this.discount,
    //     subTotal: this.total,
    //     otherCharges: this.OtherChargeTotal,
    //     netAmount: this.netAmount,
    //     oldCreditAmount: this.oldCreditAmount,
    //     netTotalAmount: (this.netAmount + this.customerData.oldCreditAmount).toFixed(2),
    //     payAmount: this.payAmount,
    //     creditAmount: (this.netAmount + this.customerData.oldCreditAmount - this.payAmount).toFixed(2),
    //     changeAmount: (this.payAmount - (this.netAmount + this.customerData.oldCreditAmount).toFixed(2)).toFixed(2),
    //     dueDate: this.dueDate
    //   }
    //   console.log('pend data', this.printDataValue)
    //   this.$store
    //     .dispatch('pos/createPOSOrder', this.printDataValue)
    //     .then(() => {
    //       this.print = false
    //     })
    //     .catch(() => {
    //       console.log('print Error')
    //     })
    // },
    // async payNow() {
    //   this.printDataValue = {
    //     receiptNo: '',
    //     customer: this.customerData,
    //     casher: this.$store.getters.curUserInfo,
    //     soldItemsList: this.selectedItemList,
    //     otherChargesList: this.otherChargesList,
    //     totalTax: this.tax,
    //     totalDiscount: this.discount,
    //     subTotal: this.total,
    //     otherCharges: this.OtherChargeTotal,
    //     netAmount: this.netAmount,
    //     oldCreditAmount: this.oldCreditAmount,
    //     netTotalAmount: (this.netAmount + this.customerData.oldCreditAmount).toFixed(2),
    //     payAmount: this.payAmount,
    //     creditAmount: (this.netAmount + this.customerData.oldCreditAmount - this.payAmount).toFixed(2),
    //     changeAmount: (this.payAmount - (this.netAmount + this.customerData.oldCreditAmount).toFixed(2)).toFixed(2)
    //   }
    // },
    async order() {
      this.saveOrderData = {
        receiptNo: '',
        customerId: this.customerData.id,
        customerName: this.customerData.name,
        casherName: this.$store.getters.curUserInfo.username,
        soldItemsList: this.selectedItemList,
        otherChargesList: this.otherChargesList,
        subTotal: this.total,
        otherTotal: this.OtherChargeTotal,
        totalTax: this.tax,
        totalDiscount: this.discount,
        total: this.netAmount,
        oldCreditAmount: this.customerData.oldCreditAmount,
        grandtotal: (this.netAmount + this.customerData.oldCreditAmount).toFixed(2),
        paidAmount: this.payAmount,
        creditAmount: (this.netAmount + this.customerData.oldCreditAmount).toFixed(2),
        change: 0,
        dueDate: null,
        paymentStatus: 'credit'
      }
      if (this.saveOrderData.soldItemsList.length === 0) {
        this.$message({
          message: 'Please select unit',
          type: 'error',
          duration: 5 * 1000
        })
        return false
      }
      this.loading = true
      await createPOSOrder(this.saveOrderData).then(response => {
        this.loading = false
        this.selectedItemList = []
        this.printOrderVaule = response.data
        this.setTotal()
        this.setOtherTotal()
        this.printOrder = true
        this.getProductList()
      }).catch((error) => {
        this.$message({
          message: error,
          type: 'error',
          duration: 5 * 1000
        })
        this.loading = false
      })
    },
    async payNow() {
      this.savePayNowData = {
        receiptNo: '',
        customerId: this.customerData.id,
        customerName: this.customerData.name,
        casherName: this.$store.getters.curUserInfo.name,
        soldItemsList: this.selectedItemList,
        otherChargesList: this.otherChargesList,
        subTotal: this.total,
        otherTotal: this.OtherChargeTotal,
        totalTax: this.tax,
        totalDiscount: this.discount,
        total: this.netAmount,
        oldCreditAmount: this.customerData.oldCreditAmount,
        grandtotal: (this.netAmount + this.customerData.oldCreditAmount).toFixed(2),
        paidAmount: this.payAmount,
        creditAmount: (this.netAmount + this.customerData.oldCreditAmount) > this.payAmount ? (this.netAmount + this.customerData.oldCreditAmount - this.payAmount).toFixed(2) : 0,
        change: (this.netAmount + this.customerData.oldCreditAmount) <= this.payAmount ? (this.payAmount - (this.netAmount + this.customerData.oldCreditAmount).toFixed(2)).toFixed(2) : 0,
        dueDate: (this.netAmount + this.customerData.oldCreditAmount) > this.payAmount ? this.dueDate : null,
        paymentStatus: (this.netAmount + this.customerData.oldCreditAmount) > this.payAmount ? 'credit' : 'paid'
      }

      if (this.savePayNowData.soldItemsList.length === 0) {
        this.$message({
          message: 'Please select unit',
          type: 'error',
          duration: 5 * 1000
        })
        return false
      }
      this.loading = true
      await createPOSPay(this.savePayNowData).then(response => {
        this.loading = false
        this.selectedItemList = []
        this.printSaleVaule = response.data
        this.printPay = true
        this.setTotal()
        this.setOtherTotal()
        this.getProductList()
      }).catch((error) => {
        this.$message({
          message: error,
          type: 'error',
          duration: 5 * 1000
        })
        this.loading = false
      })
    },

    // sendPrintData() {
    //   this.printDataValue = {
    //     receiptNo: Date.now(),
    //     date: this.today.split(',')[0],
    //     time: this.today.split(',')[1],
    //     customer: this.customerData,
    //     casher: this.$store.getters.curUserInfo,
    //     soldItemsList: this.selectedItemList,
    //     otherChargesList: this.otherChargesList,
    //     totalTax: this.tax,
    //     totalDiscount: this.discount,
    //     subTotal: this.total,
    //     otherCharges: this.OtherChargeTotal,
    //     netAmount: this.netAmount,
    //     oldCreditAmount: this.oldCreditAmount,
    //     netTotalAmount: (this.netAmount + this.customerData.oldCreditAmount).toFixed(2),
    //     payAmount: this.payAmount,
    //     creditAmount: (this.netAmount + this.customerData.oldCreditAmount - this.payAmount).toFixed(2),
    //     changeAmount: (this.payAmount - (this.netAmount + this.customerData.oldCreditAmount).toFixed(2)).toFixed(2)
    //   }
    //   console.log('print data', this.printDataValue)
    //   this.$store
    //     .dispatch('pos/createPOSPay', this.printDataValue)
    //     .then(() => {
    //       this.print = false
    //     })
    //     .catch(() => {
    //       console.log('print Error')
    //     })
    // },
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
    handleSupplierClear() {
      this.selectedSupplier = ''
      this.searchClick()
    },
    openNewTab(name) {
      // this.$store.dispatch('app/setNewTab', true)
      const routeData = this.$router.resolve({ name: name, query: { data: 'someData' }})
      window.open(routeData.href, '_blank')
    },
    setFocus(val) {
      this.$refs[val][0].focus()
    },
    printData() {
      // this.sendPrintData()
      this.$htmlToPaper('printMe')
    },
    printOrderData() {
      // this.sendOrderData()
      this.$htmlToPaper('printMe')
    },
    clearItemList() {
      this.selectedItemList = []
      this.otherChargesList = []
      this.setTotal()
      this.setOtherTotal()
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
      this.searchClick()
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
      if (data.productQty === 0 || data.productQty < 0) {
        this.noStockdialogVisible = true
      } else {
        this.selectedItem = data
        if (data.unit.length > 1) {
          this.dialogVisible = true
        } else {
          this.addSaleItem(data.unit[0], data.productQty)
        }
      }
    },
    checkQty(qty, total) {
      if (Number(total) - Number(qty) < 0) {
        this.noStockdialogVisible = true
        return true
      } else {
        return false
      }
    },

    addSaleItem(item, totalQty) {
      const selected = {
        ...item,
        tax: this.selectedItem.taxPercent,
        discount: 0,
        qty: 1,
        realSellPrice: item.sellPrice,
        totalQty: this.selectedItem.productQty
      }
      console.log(this.selectedItem.productQty)
      const self = this
      var exists = this.selectedItemList.some(function(field) {
        var flag = field.id === selected.id
        if (flag) {
          if (Number(totalQty) - Number(field.qty) <= 0) {
            self.noStockdialogVisible = true
          } else {
            field.qty = Number(field.qty) + 1
          }
        }
        return flag
      })
      if (!exists) {
        this.selectedItemList.push(selected)
      }
      this.dialogVisible = false
      this.setTotal()
    },

    removeItem(i) {
      this.selectedItemList.splice(i, 1)
    },

    setTotal() {
      this.total = 0
      this.tax = 0
      for (const i of this.selectedItemList) {
        this.total += (parseFloat(i.realSellPrice) * i.qty - (i.qty * parseFloat(i.realSellPrice) * (i.discount / 100))) // + ((parseFloat(i.realSellPrice) * i.count) * i.tax / 100)
        this.tax += (parseFloat(i.realSellPrice) * i.tax / 100 * i.qty)
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
    async categorySearch(q, cb) {
      const params = {
        q: q
      }
      await getCategory(params).then(response => {
        this.categoryList = response.data
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
        supplier: this.selectedSupplier ? this.selectedSupplier : '',
        category: this.searchCategory ? this.searchCategory : ''
      }
      await getPOSProductList(params).then(response => {
        this.itemList = response.data
        // console.log(this.itemList)
      })
    },
    change(val) {
      console.log(val)
      console.log(this.categoryList[val])
    },
    async handleSelectCustomer(val) {
      this.customerData = val
      await getCreditReceiptByCustomer(val.id).then(response => {
        const camtList = response.data
        let total = 0
        this.creditAmountList = []
        for (const obj of camtList) {
          this.creditAmountList.push(obj)
          total = total + Number(obj.sum)
        }
        this.customerData.oldCreditAmount = Number(total)
        // console.log(this.itemList)
      })
      this.setTotal()
    },
    clearCustomer(val) {
      this.customerData = this.initCustomer()
      this.customer = ''
      this.setTotal()
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

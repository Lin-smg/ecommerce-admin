import { getCategory } from '@/api/category'
import { getCustomerList } from '@/api/customer'
export const POS = {
  data: function() {
    return {
      pos: 'pos',
      searchValue: '',
      searchType: '',
      customer: '',
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
      dialogVisible: false,
      popVisible: false,
      selectedItemList: [],
      selectedItem: '',
      catActive: '',
      total: 0
    }
  },
  created() {
    const self = this
    this.getCategory()
    self.$store.dispatch('app/setBackHandle', true)
    window.onpopstate = function() {
      localStorage.setItem('back', true)
    }
  },
  methods: {
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
      this.dialogVisible = true
    },

    addSaleItem() {
      const selected = {
        name: this.selectedItem,
        count: 1
      }
      var exists = this.selectedItemList.some(function(field) {
        var flag = field.name === selected.name
        if (flag) {
          field.count += 1
        }
        return flag
      })
      if (!exists) {
        this.selectedItemList.push(selected)
      }
      this.dialogVisible = false
      this.setTotal()
      console.log(this.selectedItemList)
    },

    removeItem(i) {
      this.selectedItemList.splice(i, 1)
    },

    setTotal() {
      this.total = 0
      for (const i of this.selectedItemList) {
        this.total += i.count
      }
      console.log(this.total)
    },

    async getCategory() {
      const params = {
      }
      await getCategory(params).then(response => {
        this.categoryList = response.data
        console.log(response.data)
      })
    },

    async getAllProduct() {
    },

    async customerSearch(q, cb) {
      const params = {
        group: '',
        sort: '',
        cur_page: this.pageIndex,
        per_page: this.pageSize,
        q: q
      }
      getCustomerList(params).then(response => {
        this.customersData = response.data
        cb(response.data)
      })
    },

    async productSearch(q, cb) {

    },
    createCustomer() {
      // this.$router.push({name: 'Customers'});
    },
    setBackHandle() {

    },
    searchClick() {
      console.log('rou', this.$route.name)
      console.log('search', this.searchType)
      console.log('search', this.searchValue)
    },
    change(val) {
      console.log(val)
      console.log(this.categoryList[val])
    },
    handleSelect(val) {
      this.customerData = val
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
    },
    otherChargeDelete(data) {
      this.otherChargesList.splice(this.otherChargesList.indexOf(data), 1)
    }
  }

}

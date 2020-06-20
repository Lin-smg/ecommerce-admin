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
      categoryList: []
    }
  },
  created() {
    const self = this
    this.getCategory();
    self.$store.dispatch('app/setBackHandle', true)
    window.onpopstate = function() {
      localStorage.setItem('back', true)
    }
  },
  methods: {
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
      if (!this.otherCharge.name) {
        return
      }
      this.otherChargesList.push({ name: this.otherCharge.name, amount: this.otherCharge.amount })
      // this.otherCharge.name = ''
      // this.otherCharge.amount = 0
      console.log(this.otherCharge.name)
    },
    otherChargeDelete(data) {
      this.otherChargesList.splice(this.otherChargesList.indexOf(data), 1)
    }
  }

}

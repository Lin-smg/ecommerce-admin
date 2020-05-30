
export const POS = {
  data: function() {
    return {
      pos: 'pos',
      searchValue: '',
      searchType: '',
      customer: '',
      customerList: [
        {
          value: 'Mg Mg',
          id: 1
        },
        {
          value: 'Ma Ma',
          id: 2
        }
      ],
      num: 0,
      otherChargesList: [],
      otherCharge: {
        name: '',
        amount: 0
      },
      name: '',
      amount: 0
    }
  },
  created() {
    const self = this
    self.$store.dispatch('app/setBackHandle', true)
    window.onpopstate = function() {
      localStorage.setItem('back', true)
    }

  },
  methods: {
    setBackHandle() {

    },
    searchClick() {
      console.log('rou', this.$route.name)
      console.log('search', this.searchType)
      console.log('search', this.searchValue)
    },
    change(val) {
      console.log(val)
    },

    querySearch(queryString, cb) {
      const customer = this.customerList
      const results = queryString ? customer.filter(this.createFilter(queryString)) : customer
      // call callback function to return suggestions
      cb(results)
    },
    createFilter(queryString) {
      return (link) => {
        return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(val) {
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

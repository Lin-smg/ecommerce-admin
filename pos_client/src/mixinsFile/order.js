import { getAllOrder, getOrderItemByOrderNo, updateOrder } from '@/api/order'

export const Order = {
  data() {
    return {
      pageSize: 10,
      pageIndex: 1,
      approveDialog: false,
      rejectDialog: false,
      editDialog: false,
      remark: '',
      searchValue: '',
      isUpdate: false,
      orderList: [],
      showDetailDialog: false,
      orderNo: null,
      selectedOrder: {}
    }
  },
  created() {
    this.getAllOrder()
  },
  methods: {
    async getAllOrder() {
      const params = {
        group: '',
        sort: '',
        cur_page: this.pageIndex,
        per_page: this.pageSize,
        q: this.searchValue ? this.searchValue : ''
      }
      this.listLoading = true

      await getAllOrder(params).then(response => {
        console.log('order >', response)
        this.orderList = response.data
        this.pageIndex = response.meta.curPage
        this.pageSize = response.meta.perPage
        this.totalCount = response.meta.totalResults
        this.listLoading = false
      })
    },

    async getOrderItemByOrderNo(orderNo) {
      await getOrderItemByOrderNo(orderNo).then(response => {
        console.log('order item, ', response)
      })
    },

    acceptOrder(order) {
      this.approveDialog = true
      this.selectedOrder = order
    },
    rejectOrder(order) {
      this.rejectDialog = true
      this.selectedOrder = order
    },
    editOrder(order) {
      this.selectedOrder = order
      this.editDialog = true
    },

    acceptOK() {
      this.selectedOrder.operatorAccount = this.$store.getters.curUserInfo.userid
      this.selectedOrder.operatorName = this.$store.getters.curUserInfo.username
      this.selectedOrder.status = 'processing'
      this.selectedOrder.remark = this.remark
      this.updateOrder(this.selectedOrder)
      this.approveDialog = false
    },

    rejectOK() {
      if (!this.remark) {
        return
      }
      this.selectedOrder.operatorAccount = this.$store.getters.curUserInfo.userid
      this.selectedOrder.operatorName = this.$store.getters.curUserInfo.username
      this.selectedOrder.status = 'reject'
      this.selectedOrder.remark = this.remark
      this.updateOrder(this.selectedOrder)
      this.rejectDialog = false
    },

    editOK() {
      this.selectedOrder.operatorAccount = this.$store.getters.curUserInfo.userid
      this.selectedOrder.operatorName = this.$store.getters.curUserInfo.username

      this.updateOrder(this.selectedOrder)
      this.editDialog = false
    },

    async updateOrder(orderData) {
      console.log(orderData)
      this.$store
        .dispatch('order/updateOrder', orderData)
        .then(response => {
          console.log(response)
        })
        .catch(() => {})
    },

    showDetail(data) {
      // this.getOrderItemByOrderNo(data.orderNo)
      this.orderNo = data.orderNo
      this.showDetailDialog = true
    },

    searchClick() {
      this.getAllOrder()
    },

    handleSizeChange(val) {
      this.pageSize = val
      this.getAllOrder()
    },

    handleCurrentChange(val) {
      this.pageIndex = val
      this.getAllOrder()
    }
  }
}

<template>
  <div>
    <el-table
      border
      :data="orderList"
      style="width: 100%;background-color: #e9e3e3"
      highlight-current-rows
    >
      <el-table-column align="center" min-width="200px">
        <template slot="header">
          <span>Order NO.</span>
        </template>
        <template slot-scope="{row}">
          <span>{{ row.orderNo }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150px">
        <template slot="header">
          <span>Customer Name</span>
        </template>
        <template slot-scope="{row}">
          <span>{{ row.customerName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px">
        <template slot="header">
          <span>Date</span>
        </template>
        <template slot-scope="{row}">
          <span>{{ row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px">
        <template slot="header">
          <span>Subtotal</span>
        </template>
        <template slot-scope="{row}">
          <span>{{ row.subTotal }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px">
        <template slot="header">
          <span>Total</span>
        </template>
        <template slot-scope="{row}">
          <span>{{ row.total }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px">
        <template slot="header">
          <span>Discount</span>
        </template>
        <template slot-scope="{row}">
          <span>{{ row.totalDiscount }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px">
        <template slot="header">
          <span>Tax</span>
        </template>
        <template slot-scope="{row}">
          <span>{{ row.totalTax }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px">
        <template slot="header">
          <span>Grand Total</span>
        </template>
        <template slot-scope="{row}">
          <span>{{ row.grandtotal }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="100px">
        <template slot="header">
          <span>Status</span>
        </template>
        <template slot-scope="{row}">
          <span>{{ row.status }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150px">
        <template slot="header">
          <span>Operator Name</span>
        </template>
        <template slot-scope="{row}">
          <span>{{ row.operatorName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150px">
        <template slot="header">
          <span>Remarks</span>
        </template>
        <template slot-scope="{row}">
          <span>{{ row.remark }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" fixed="left" min-width="250px">
        <template slot="header">
          <span>Action</span>
        </template>
        <template slot-scope="{row}">
          <!-- <el-button type="text" size="mini" style="background: #61e361; color:white; padding: 5px; margin:0px" @click="acceptOrder(row)">Accept</el-button>
          <el-button type="text" size="mini" style="background: #eb5e5e;color: white; padding: 5px; margin:0px" @click="rejectOrder(row)">Reject</el-button>
          <el-button type="text" size="mini" style="background: #409EFF; color:white; padding: 5px; margin:0px" @click="editOrder(row)">Edit</el-button> -->
          <el-button type="text" size="mini" style="background: #409EFF; color:white; padding: 5px; margin:0px" @click="showOrderDetail(row)">Detail</el-button>

        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="showDetailDialog"
      append-to-body
      fullscreen
    >
      <order-detail :order-no="orderNo" />
    </el-dialog>
  </div>
</template>

<script>
import { getOrderByCustomerId } from '../../api/order'
import OrderDetail from '../OrderDetail/index.vue'
export default {
  components: { OrderDetail },
  props: {
    customerId: {
      require: true,
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      orderList: [],
      showDetailDialog: false,
      orderNo: null
    }
  },

  watch: {
    customerId() {
      this.getOrderList()
    }
  },

  created() {
    this.getOrderList()
  },

  methods: {
    getOrderList() {
      getOrderByCustomerId(this.customerId).then(response => {
        console.log('order item >> ', response.data)
        this.orderList = response.data
      })
    },

    showOrderDetail(data) {
      this.showDetailDialog = true
      this.orderNo = data.orderNo
    }
  }

}
</script>

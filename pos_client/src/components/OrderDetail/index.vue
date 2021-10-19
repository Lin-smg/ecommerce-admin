<template>
  <div>
    <el-card shadow="never">
      <h2>
        Order Number : <span> {{ orderNo }} </span>

        <i
          v-clipboard:copy="orderNo"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          type="text"
          class="el-icon-document-copy"
          style="cursor: pointer"
        />
      </h2>
      <div style="font-size: 18px; font-weight: bold; color: grey">
        <div>
          SubTotal : <span class="number">{{ orderData.subTotal }}</span>
        </div>
        <div>
          Total Discount :
          <span class="number">{{ orderData.totalDiscount }}</span>
        </div>
        <div>
          Total Tax : <span class="number">{{ orderData.totalTax }}</span>
        </div>
        <div>
          Grand Total : <span class="number">{{ orderData.grandtotal }}</span>
        </div>
      </div>
    </el-card>
    <br>
    <div>
      <el-table border :data="orderItemList" highlight-current-rows>
        <el-table-column align="center" min-width="200px">
          <template slot="header">
            <span>Product Code</span>
          </template>
          <template slot-scope="{ row }">
            <span>{{ row.productCode }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="150px">
          <template slot="header">
            <span>Product Name</span>
          </template>
          <template slot-scope="{ row }">
            <span>{{ row.productName }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="150px">
          <template slot="header">
            <span>Category Name</span>
          </template>
          <template slot-scope="{ row }">
            <span>{{ row.categoryName }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="150px">
          <template slot="header">
            <span>Brand</span>
          </template>
          <template slot-scope="{ row }">
            <span>{{ row.brandName }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="150px">
          <template slot="header">
            <span>Unit Price</span>
          </template>
          <template slot-scope="{ row }">
            <span>{{ row.unitPrice }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="150px">
          <template slot="header">
            <span>Sell Price</span>
          </template>
          <template slot-scope="{ row }">
            <span>{{ row.unitPrice }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="150px">
          <template slot="header">
            <span>Qty</span>
          </template>
          <template slot-scope="{ row }">
            <span>{{ row.productQty }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" min-width="100px">
          <template slot="header">
            <span>Price</span>
          </template>
          <template slot-scope="{ row }">
            <span>{{ row.totalPrice }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" fixed="left" min-width="150px">
          <template slot="header">
            <span>Action</span>
          </template>
          <template slot-scope="{ row }">
            <el-button
              type="text"
              size="mini"
              style="background: #409EFF; color:white; padding: 5px; margin:0px"
              @click="showEditDialog(row)"
            >Edit</el-button>

            <el-button
              type="text"
              size="mini"
              style="background: #eb5e5e;color: white; padding: 5px; margin:0px"
            >delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="Edit" :visible.sync="showDialog" append-to-body>
      <el-form ref="createForm" label-width="220px" style="width: 500px">
        <el-form-item label="Product Qty" prop="code">
          <el-input
            v-model="editData.qty"
            min="1"
            type="number"
            placeholder=""
            autocomplete="off"
          />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary">Confirm</el-button>
        <el-button @click="showDialog = false">Cancel</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrderItemByOrderNo, getOrderByOrderNo } from '@/api/order'
export default {
  props: {
    orderNo: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      orderItemList: [],
      showDialog: false,
      editData: {},
      orderData: {},
      message: 'Copy These Text'
    }
  },

  watch: {
    orderNo() {
      this.getOrderByOrderNo()
    }
  },

  created() {
    this.getOrderByOrderNo()
  },

  methods: {
    onCopy: function(e) {
      alert('You just copied: ' + e.text)
    },
    onError: function(e) {
      alert('Failed to copy texts')
    },

    async getOrderByOrderNo() {
      await getOrderByOrderNo(this.orderNo).then(response => {
        console.log('order item >> ', JSON.stringify(response.data))
        this.orderData = response.data
        this.orderItemList = response.data.orderItems
      })
    },

    showEditDialog(data) {
      this.showDialog = true
      this.editData = data
    }
  }
}
</script>

<style scoped>
.number {
  color: blue;
}
</style>

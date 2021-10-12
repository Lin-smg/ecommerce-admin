<template>
  <div class="category-container">
    <el-card>
      <div class="header" style="margin-bottom: 10px">
        <span style="line-height: 40px">Order</span>

        <!-- <el-button style="float: right; margin-left: 30px" type="primary" @click="showDialog('add')">Add</el-button> -->

        <div style="width: 250px; float: right">
          <el-input v-model="searchValue" placeholder="Please input" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="searchClick" />
          </el-input>
        </div>
      </div>

      <div style="">
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
              <el-button type="text" size="mini" style="background: #61e361; color:white; padding: 5px; margin:0px" @click="acceptOrder(row)">Accept</el-button>
              <el-button type="text" size="mini" style="background: #eb5e5e;color: white; padding: 5px; margin:0px" @click="rejectOrder(row)">Reject</el-button>
              <el-button type="text" size="mini" style="background: #409EFF; color:white; padding: 5px; margin:0px" @click="editOrder(row)">Edit</el-button>
              <el-button type="text" size="mini" style="background: #409EFF; color:white; padding: 5px; margin:0px" @click="showDetail(row)">Detail</el-button>

            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          v-if="orderList.length > 0"
          :page-sizes="[5,10,20,30]"
          :page-size="pageSize"
          :page-index="pageIndex"
          layout="sizes, prev, pager, next"
          :total="totalCount"
          style="float:right;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <el-dialog
      :visible.sync="showDetailDialog"
      fullscreen
    >
      <order-detail :order-no="orderNo" />
    </el-dialog>

    <el-dialog
      :visible.sync="approveDialog"
    >
      <div style="text-align: center;font-size: 18px;margin-bottom: 18px;">Are you sure to accept Order No. : {{ selectedOrder.orderNo }}</div>
      <div style="text-align: center">
        <el-input
          v-model="remark"
          style="width: 300px"
          type="text"
          placeholder="Enter Remarks"
          autocomplete="off"
        />
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="acceptOK">Confirm</el-button>
        <el-button @click="approveDialog = false">Cancel</el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="rejectDialog"
    >
      <div style="text-align: center;font-size: 18px;margin-bottom: 18px;">Are you sure to reject Order No. : {{ selectedOrder.orderNo }}</div>
      <div style="text-align: center">
        <el-input
          v-model="remark"
          style="width: 300px"
          type="text"
          placeholder="Enter Remarks"
          autocomplete="off"
        />
        <div v-show="!remark" style="color: red; margin-top: 5px">Remark is Required !!!</div>
      </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="rejectOK">Confirm</el-button>
        <el-button @click="rejectDialog = false">Cancel</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Edit" :visible.sync="editDialog">
      <el-form ref="createForm" label-width="220px" style="width: 500px">
        <el-form-item label="Order Number" prop="code">
          <el-input
            v-model="selectedOrder.orderNo"
            type="text"
            placeholder=""
            disabled
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item label="Date">
          <el-date-picker
            v-model="selectedOrder.date"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>

        <el-form-item label="Subtotal" prop="code">
          <el-input
            v-model="selectedOrder.subTotal"
            type="text"
            placeholder=""
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Total" prop="code">
          <el-input
            v-model="selectedOrder.total"
            type="text"
            placeholder=""
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Total Discount" prop="code">
          <el-input
            v-model="selectedOrder.totalDiscount"
            type="text"
            placeholder=""
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Total Tax" prop="code">
          <el-input
            v-model="selectedOrder.totalTax"
            type="text"
            placeholder=""
            autocomplete="off"
          />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button type="primary" @click="editOK">Confirm</el-button>
        <el-button @click="editDialog = false">Cancel</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { Order } from '../../mixinsFile/order'
import OrderDetail from '@/components/OrderDetail/index.vue'

export default {
  name: 'Index',
  components: { OrderDetail },
  mixins: [Order]
}
</script>

<style scoped>
.category-container {
  margin: 30px;
}
</style>

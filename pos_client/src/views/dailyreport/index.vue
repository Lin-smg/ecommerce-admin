<template>
  <div class="brand-container">
    <el-card>
      <div class="header" style="margin-bottom: 10px">
        <span style="line-height: 40px">Daily Report</span>
        <el-date-picker
          style="margin-left: 30px"
          v-model="ddate"
          type="date"
          placeholder="Pick a day"
          :picker-options="pickerOptions"

        >
        </el-date-picker>
        <el-button type="primary">Search</el-button>

        <el-button style="float: right; margin-left: 30px" type="primary" >Export Excel</el-button>

      </div>

      <div style="">
        <el-table
          border
          :data="dreportData"
          style="width: 100%;background-color: #e9e3e3"
          highlight-current-row
        >
          <el-table-column fixed align="center">
            <template slot="header">
              <span>ReceipeNo</span>
            </template>
            <template slot-scope="{row}">
              <span>{{ row.receipeNo }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center">
            <template slot="header">
              <span>CustomerName</span>
            </template>
            <template slot-scope="{row}">
              <span>{{ row.brandName }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center">
            <template slot="header">
              <span>Total</span>
            </template>
            <template slot-scope="{row}">
              <span>{{ row.description }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center">
            <template slot="header">
              <span>Discount</span>
            </template>
            <template slot-scope="{row}">
              <span>{{ row.description }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center">
            <template slot="header">
              <span>Tax</span>
            </template>
            <template slot-scope="{row}">
              <span>{{ row.description }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center">
            <template slot="header">
              <span>NetAmount</span>
            </template>
            <template slot-scope="{row}">
              <span>{{ row.description }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center">
            <template slot="header">
              <span>Old Credit Amount</span>
            </template>
            <template slot-scope="{row}">
              <span>{{ row.description }}</span>
            </template>
          </el-table-column>

           <el-table-column align="center">
            <template slot="header">
              <span>Net Total</span>
            </template>
            <template slot-scope="{row}">
              <span>{{ row.description }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center">
            <template slot="header">
              <span>Cash Pay Amount</span>
            </template>
            <template slot-scope="{row}">
              <span>{{ row.description }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center">
            <template slot="header">
              <span>Last Amount</span>
            </template>
            <template slot-scope="{row}">
              <span>{{ row.description }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center">
            <template slot="header">
              <span>Other Amount</span>
            </template>
            <template slot-scope="{row}">
              <span>{{ row.description }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" fixed="right">
            <template slot="header">
              <span>Action</span>
            </template>
            <template slot-scope="{row}">
              <el-button type="warning" size="mini">Detail</el-button>
              <el-popconfirm
                confirm-button-text="OK"
                cancel-button-text="No, Thanks"
                icon="el-icon-info"
                icon-color="red"
                title="Are you sure to delete this?"
                @onConfirm="deleteBrand(row)"
              >
                <el-button slot="reference" type="danger" size="mini">Print</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          :page-sizes="[10,20,30]"
          :page-size="pageSize"
          :page-index="pageIndex"
          layout="sizes, prev, pager, next"
          :total="dreportData.length"
          style="float:right;"
          @size-change="onPageSizeChange"
          @current-change="onPageIndexChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script>
import { DailyReport } from '../../mixinsFile/dailyreport'

export default {
  name: 'Index',
  mixins: [DailyReport]
}
</script>

<style scoped>
.brand-container {
  margin: 30px;
}
</style>

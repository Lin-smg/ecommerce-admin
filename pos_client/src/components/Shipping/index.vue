<template>
  <div>
    <el-table border :data="shippingList" highlight-current-rows>
      <el-table-column align="center" min-width="200px">
        <template slot="header">
          <span>Full Name</span>
        </template>
        <template slot-scope="{ row }">
          <span>{{ row.fullName }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150px">
        <template slot="header">
          <span>Phone</span>
        </template>
        <template slot-scope="{ row }">
          <span>{{ row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150px">
        <template slot="header">
          <span>Address</span>
        </template>
        <template slot-scope="{ row }">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150px">
        <template slot="header">
          <span>City</span>
        </template>
        <template slot-scope="{ row }">
          <span>{{ row.city }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150px">
        <template slot="header">
          <span>Region</span>
        </template>
        <template slot-scope="{ row }">
          <span>{{ row.region }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" min-width="150px">
        <template slot="header">
          <span>Note</span>
        </template>
        <template slot-scope="{ row }">
          <span>{{ row.note }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getShippingByCustomerId } from '@/api/customer'
export default {
  name: 'Shipping',
  props: {
    customerId: {
      require: true,
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      shippingList: []
    }
  },

  watch: {
    customerId() {
      this.getShippingByCustomerId()
    }
  },

  created() {
    this.getShipping()
  },

  methods: {
    getShipping() {
      getShippingByCustomerId(this.customerId).then(response => {
        console.log('ship', response)
        this.shippingList = response.data
      })
    }
  }
}
</script>

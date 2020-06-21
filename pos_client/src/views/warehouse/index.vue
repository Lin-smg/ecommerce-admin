<template>
  <div class="user-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleTab(activeName)">
      <el-tab-pane label="All Warehouse" name="view">
        <div>
          <el-input v-model="searchValue" placeholder="Please input" style="width: 250px; float: right">
            <el-button slot="append" icon="el-icon-search" @click="searchClick" />
          </el-input>
        </div>
        <div>
          <el-table
            border
            :data="warehousesData"
            style="width: 100%;background-color: #e9e3e3"
            highlight-current-row
          >
            <el-table-column align="center">
              <template slot="header">
                <span>WarehouseName</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.wareHouseName }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center">
              <template slot="header">
                <span>Location</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.location }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center">
              <template slot="header">
                <span>Space</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.space }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center">
              <template slot="header">
                <span>Remark</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.remark }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="200px">
              <template slot="header">
                <span>Operations</span>
              </template>
              <template slot-scope="{row}">
                <el-button size="mini" @click="updateWareHouse(row)">update</el-button>
                <el-popconfirm
                  confirm-button-text="OK"
                  cancel-button-text="No, Thanks"
                  title="Are you sure to delete this?"
                  @onConfirm="deleteWareHouse(row)"
                >
                  <el-button slot="reference" size="mini" type="danger">delete</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            v-if="warehousesData.length > 0"
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
      </el-tab-pane>

      <!-- user create tab-->
      <el-tab-pane label="Create Warehouse" name="create">
        <el-form ref="warehouseForm" label-width="220px" style="width: 500px">
          <el-form-item label="Warehouse Name" prop="wareHouseName">
            <el-input v-model="warehouseCreateForm.wareHouseName" type="text" placeholder="warehouse name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Location" prop="location">
            <el-input v-model="warehouseCreateForm.location" type="text" placeholder="location" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Space" prop="space">
            <el-input v-model="warehouseCreateForm.space" type="text" placeholder="Space" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Remark" prop="remark">
            <el-input v-model="warehouseCreateForm.remark" type="text" placeholder="remark" autocomplete="off" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="createOk">Create</el-button>
            <el-button @click="createReset">Reset</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>

      <!-- Warehouse update tab -->
      <el-tab-pane label="Update User" name="update" :disabled="true">
        <el-form ref="updateForm" label-width="220px" style="width: 500px">

          <el-form-item label="Warehouse Name" prop="wareHouseName">
            <el-input v-model="warehouseUpdateForm.wareHouseName" type="text" :disabled="true" placeholder="warehouse name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Location" prop="location">
            <el-input v-model="warehouseUpdateForm.location" type="text" placeholder="location" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Space" prop="space">
            <el-input v-model="warehouseUpdateForm.space" type="text" placeholder="Space" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Remark" prop="remark">
            <el-input v-model="warehouseUpdateForm.remark" type="text" placeholder="remark" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateOk">Update</el-button>
            <el-button @click="updateReset">Reset</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { Warehouse } from '../../mixinsFile/warehouse'
// import PermissionList from '../../components/PermissionList/index'
export default {
  name: 'Index',
  // components: { PermissionList },
  mixins: [Warehouse]
}
</script>

<style scoped>
  .user-container{
    margin: 30px;
  }

</style>

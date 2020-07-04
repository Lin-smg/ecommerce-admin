<template>
  <div class="user-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleTab(activeName)">
      <el-tab-pane label="All Units" name="view">
        <div>
          <el-input v-model="searchValue" placeholder="Please input" style="width: 250px; float: right">
            <el-button slot="append" icon="el-icon-search" @click="searchClick" />
          </el-input>
        </div>
        <div>
          <el-table
            border
            :data="unitsData"
            style="width: 100%;background-color: #e9e3e3"
            highlight-current-row
          >
            <el-table-column align="center">
              <template slot="header">
                <span>Unit/PKG</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.unitName }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center">
              <template slot="header">
                <span>Quantity</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.unitQty }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center">
              <template slot="header">
                <span>Smallest Unit</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.childUnitName }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center">
              <template slot="header">
                <span>Smallest Unit Quantity</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.childUnitQty }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="200px">
              <template slot="header">
                <span>Operations</span>
              </template>
              <template slot-scope="{row}">
                <el-button size="mini" @click="updateUnit(row)">edit</el-button>
                <el-popconfirm
                  confirm-button-text="OK"
                  cancel-button-text="No, Thanks"
                  title="Are you sure to delete this?"
                  @onConfirm="deleteUnit(row)"
                >
                  <el-button slot="reference" size="mini" type="danger">delete</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            v-if="unitsData.length > 0"
            :page-sizes="[5,10,20,30]"
            :page-size="pageSize"
            :page-index="pageIndex"
            layout="total,sizes, prev, pager, next"
            :total="totalCount"
            style="float:right;"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-tab-pane>

      <!-- user create tab-->
      <el-tab-pane label="Create Unit" name="create">
        <el-form ref="unitCreateForm" :model="unitCreateForm" label-width="220px" style="width: 500px">
          <el-form-item label="Unit/PKG" prop="unitName">
            <el-input v-model="unitCreateForm.unitName" type="text" placeholder="Unit Name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Quantity" prop="unitQty">
            <el-input v-model="unitCreateForm.unitQty" type="number" :valuetext="1" :disabled="true" placeholder="Quantity" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Smallest Unit" prop="childUnit">
            <el-select v-model="selectedObject" value-key="id" placeholder="Select" style="width: 280px">
              <el-option
                v-for="item of childUnitsList"
                :key="item.id"
                :label="item.unitName"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Smallest Unit Quantity" prop="unitQty">
            <el-input v-model="unitCreateForm.childUnitQty" type="number" placeholder="user id" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="createOk">Create</el-button>
            <el-button @click="createReset">Reset</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>

      <!-- unit update tab -->
      <el-tab-pane label="Update Unit" name="update" :disabled="true">
        <el-form ref="unitUpdateForm" label-width="220px" style="width: 500px">
          <el-form-item label="Unit/PKG" prop="unitName">
            <el-input v-model="unitUpdateForm.unitName" type="text" placeholder="Unit Name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Quantity" prop="unitQty">
            <el-input v-model="unitUpdateForm.unitQty" type="number" :valuetext="1" :disabled="true" placeholder="Quantity" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Smallest Unit" prop="childUnit">
            <el-select v-model="selectedUpdatedObject" value-key="unitName" placeholder="Select" style="width: 280px">
              <el-option
                v-for="(item,i) in childUnitsListForUpdate"
                :key="i"
                :label="item.unitName"
                :value="item"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="Smallest Unit Quantity" prop="unitQty">
            <el-input v-model="unitUpdateForm.childUnitQty" type="number" placeholder="user id" autocomplete="off" />
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
import { Unit } from '../../mixinsFile/unit'
export default {
  name: 'Index',
  mixins: [Unit]
}
</script>

<style scoped>
  .user-container{
    margin: 30px;
  }

</style>

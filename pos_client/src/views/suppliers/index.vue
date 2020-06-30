<template>
  <div class="user-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleTab(activeName)">
      <el-tab-pane label="All Suppliers" name="view">
        <div>
          <el-button :loading="downloadLoading" style="margin:0 0 20px 20px;" type="primary" icon="el-icon-document" @click="handleDownload">
            Export Excel
          </el-button>
          <el-input
            v-model="searchValue"
            placeholder="Search..."
            style="width: 250px; float: right;margin-bottom: 10px;"
          >
            <el-button slot="append" icon="el-icon-search" @click="searchClick" />
          </el-input>
        </div>
        <div>
          <el-table
            v-loading="listLoading"
            border
            :data="suppliersData"
            style="width: 100%;background-color: #e9e3e3"
            highlight-current-row
          >
            <el-table-column header-align="center" align="left" width="300">
              <template slot="header">
                <span>Name</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column header-align="center" align="left" width="300">
              <template slot="header">
                <span>Phone Number</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.phone }}</span>
              </template>
            </el-table-column>

            <el-table-column header-align="center" align="left" width="300">
              <template slot="header">
                <span>Address</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.addressOne }}</span>
              </template>
            </el-table-column>

            <el-table-column header-align="center" align="left" width="300">
              <template slot="header">
                <span>Address</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.addressTwo }}</span>
              </template>
            </el-table-column>

            <el-table-column header-align="center" align="left" width="300">
              <template slot="header">
                <span>Address</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.city }}</span>
              </template>
            </el-table-column>

            <el-table-column header-align="center" align="left" width="300">
              <template slot="header">
                <span>E-Mail</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.email }}</span>
              </template>
            </el-table-column>

            <el-table-column fixed="right" align="center" width="200px">
              <template slot="header">
                <span>Operations</span>
              </template>
              <template slot-scope="{row}">
                <el-button size="mini" @click="updateSupplier(row)">update</el-button>
                <el-popconfirm
                  confirm-button-text="OK"
                  cancel-button-text="No, Thanks"
                  title="Are you sure to delete this?"
                  @onConfirm="deleteSupplier(row)"
                >
                  <el-button slot="reference" size="mini" type="danger">delete</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            v-if="suppliersData.length > 0"
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

      <!-- suppliers create tab-->
      <el-tab-pane label="Create Suppliers" name="create">
        <el-form ref="suppliersCreateForm" :model="suppliersCreateForm" :rules="supplierRule" label-width="220px" style="width: 500px">
          <el-form-item label="Name :" prop="name">
            <el-input v-model="suppliersCreateForm.name" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="E-Mail :" prop="email">
            <el-input v-model="suppliersCreateForm.email" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Phone Number :" prop="phone">
            <el-input v-model="suppliersCreateForm.phone" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Address 1 :" prop="addressOne">
            <el-input v-model="suppliersCreateForm.addressOne" type="textarea" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Address 2 :" prop="addressTwo">
            <el-input v-model="suppliersCreateForm.addressTwo" type="textarea" autocomplete="off" />
          </el-form-item>

          <el-form-item label="City :" prop="city">
            <el-input v-model="suppliersCreateForm.city" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="State/Province :" prop="stateOrProvince">
            <el-input v-model="suppliersCreateForm.stateOrProvince" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Zip :" prop="zipCode">
            <el-input v-model="suppliersCreateForm.zipCode" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Country :" prop="country">
            <el-input v-model="suppliersCreateForm.country" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Comments :" prop="comments">
            <el-input v-model="suppliersCreateForm.comments" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Internal Notes :" prop="internalNotes">
            <el-input v-model="suppliersCreateForm.internalNotes" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Company Name :" prop="companyName">
            <el-input v-model="suppliersCreateForm.companyName" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Account # :" prop="account">
            <el-input v-model="suppliersCreateForm.account" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="createSupplier">Create</el-button>
            <el-button @click="resetCreate">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- user update tab -->
      <el-tab-pane label="Update Suppliers" name="update" :disabled="true">
        <el-form ref="suppliersUpdateForm" :model="suppliersUpdateForm" :rules="supplierRule" label-width="220px" style="width: 500px">
          <el-form-item label="Name :" prop="name">
            <el-input v-model="suppliersUpdateForm.name" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="E-Mail :" prop="email">
            <el-input v-model="suppliersUpdateForm.email" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Phone Number :" prop="phone">
            <el-input v-model="suppliersUpdateForm.phone" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Address 1 :" prop="addressOne">
            <el-input v-model="suppliersUpdateForm.addressOne" type="textarea" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Address 2 :" prop="addressTwo">
            <el-input v-model="suppliersUpdateForm.addressTwo" type="textarea" autocomplete="off" />
          </el-form-item>

          <el-form-item label="City :" prop="city">
            <el-input v-model="suppliersUpdateForm.city" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="State/Province :" prop="stateOrProvince">
            <el-input v-model="suppliersUpdateForm.stateOrProvince" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Zip :" prop="zipCode">
            <el-input v-model="suppliersUpdateForm.zipCode" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Country :" prop="country">
            <el-input v-model="suppliersUpdateForm.country" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Comments :" prop="comments">
            <el-input v-model="suppliersUpdateForm.comments" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Internal Notes :" prop="internalNotes">
            <el-input v-model="suppliersUpdateForm.internalNotes" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Company Name :" prop="companyName">
            <el-input v-model="suppliersUpdateForm.companyName" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Account # :" prop="account">
            <el-input v-model="suppliersUpdateForm.account" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="updateSupplierOk">Update</el-button>
            <el-button @click="updateCancel">Cancel</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { User } from '../../mixinsFile/suppliers'
export default {
  name: 'Index',
  mixins: [User]
}
</script>

<style scoped>
.user-container {
  margin: 30px;
}
/* .avatar-uploader .el-upload {
  border: 1px dashed #4ed80e;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
} */
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 270px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

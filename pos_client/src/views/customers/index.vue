<template>
  <div class="user-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleTab(activeName)">
      <el-tab-pane label="All Customers" name="view">
        <div>
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
            border
            v-loading = "listLoading"
            :data="customersData"
            style="width: 100%;background-color: #e9e3e3"
            highlight-current-row
          >
            <el-table-column align="center">
              <template slot="header">
                <span>Name</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center">
              <template slot="header">
                <span>E-Mail</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.email }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center">
              <template slot="header">
                <span>Phone Number</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.phone }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center">
              <template slot="header">
                <span>Address</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.addressOne }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="200px">
              <template slot="header">
                <span>Operations</span>
              </template>
              <template slot-scope="{row}">
                <el-button size="mini" @click="updateCustomers(row)">update</el-button>
                <el-popconfirm
                  confirm-button-text="OK"
                  cancel-button-text="No, Thanks"
                  title="Are you sure to delete this?"
                  @onConfirm="deleteCustomer(row)"
                >
                  <el-button slot="reference" size="mini" type="danger">delete</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            v-if="customersData.length > 0"
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

      <!-- customers create tab-->
      <el-tab-pane label="Create Customers" name="create">
        <el-form ref="customersCreateForm" :model="customersCreateForm" :rules="customerRule" label-width="220px" style="width: 500px">
          <el-form-item label="Name :" ref="name" prop="name">
            <el-input v-model="customersCreateForm.name" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="E-Mail :" ref="email" prop="email">
            <el-input v-model="customersCreateForm.email" ref="email" type="email" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Phone Number :" ref="phone" prop="phone">
            <el-input v-model="customersCreateForm.phone" type="text" autocomplete="off" />
          </el-form-item>

          <!-- <el-form-item label="Select Image :" prop="image">
            <el-upload
              style=" border: 1px dashed #8c939d;border-radius: 6px;cursor: pointer;position: relative;overflow: hidden;"
              action="#"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="customersCreateForm.imageUrl"
                :src="customersCreateForm.imageUrl"
                class="avatar"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item> -->

          <el-form-item label="Address 1 :" ref="addressOne" prop="addressOne">
            <el-input v-model="customersCreateForm.addressOne" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Address 2 :" ref="addressTwo" prop="addressTwo">
            <el-input v-model="customersCreateForm.addressTwo" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="City :" ref="city" prop="city">
            <el-input v-model="customersCreateForm.city" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="State/Province :" ref="stateOrProvince" prop="stateOrProvince">
            <el-input v-model="customersCreateForm.stateOrProvince" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Zip :" ref="zipCode" prop="zipCode">
            <el-input v-model="customersCreateForm.zipCode" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Country :" ref="country" prop="country">
            <el-input v-model="customersCreateForm.country" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Comments :" ref="comments" prop="comments">
            <el-input v-model="customersCreateForm.comments" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Internal Notes :" ref="internalNotes" prop="internalNotes">
            <el-input v-model="customersCreateForm.internalNotes" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Company Name :" ref="companyName" prop="companyName">
            <el-input v-model="customersCreateForm.companyName" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Account # :" ref="account" prop="account">
            <el-input v-model="customersCreateForm.account" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="createCustomers">Create</el-button>
            <el-button @click="resetCreateCustomersForm">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- user update tab -->
      <el-tab-pane label="Update Customers" name="update" :disabled="true">
        <el-form ref="customersCreateForm" :model="customersCreateForm" :rules="customerRule" label-width="220px" style="width: 500px">
          <el-form-item label="Name :" prop="name">
            <el-input v-model="customersCreateForm.name" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="E-Mail :" prop="email">
            <el-input v-model="customersCreateForm.email" type="email" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Phone Number :" prop="phone">
            <el-input v-model="customersCreateForm.phone" type="text" autocomplete="off" />
          </el-form-item>

          <!-- <el-form-item label="Select Image :" prop="image">
            <el-upload
              style=" border: 1px dashed #8c939d;border-radius: 6px;cursor: pointer;position: relative;overflow: hidden;"
              action="#"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="customersCreateForm.imageUrl"
                :src="customersCreateForm.imageUrl"
                class="avatar"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item> -->

          <el-form-item label="Address 1 :" prop="addressOne">
            <el-input v-model="customersCreateForm.addressOne" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Address 2 :" prop="addressTwo">
            <el-input v-model="customersCreateForm.addressTwo" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="City :" prop="city">
            <el-input v-model="customersCreateForm.city" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="State/Province :" prop="stateOrProvince">
            <el-input v-model="customersCreateForm.stateOrProvince" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Zip :" prop="zipCode">
            <el-input v-model="customersCreateForm.zipCode" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Country :" prop="country">
            <el-input v-model="customersCreateForm.country" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Comments :" prop="comments">
            <el-input v-model="customersCreateForm.comments" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Internal Notes :" prop="internalNotes">
            <el-input v-model="customersCreateForm.internalNotes" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Company Name :" prop="companyName">
            <el-input v-model="customersCreateForm.companyName" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Account # :" prop="account">
            <el-input v-model="customersCreateForm.account" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="updateCustomerOk">Update</el-button>
            <el-button @click="resetCreateCustomersForm">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { User } from '../../mixinsFile/customers'
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

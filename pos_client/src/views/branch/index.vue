<template>
  <div class="user-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleTab(activeName)">
      <el-tab-pane label="All Branches" name="view">
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
            v-loading="listLoading"
            :data="branchData"
            style="width: 100%;background-color: #e9e3e3"
            highlight-current-row
          >
            <el-table-column align="center">
              <template slot="header">
                <span>Code</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.code }}</span>
              </template>
            </el-table-column>

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
                <span>Phone</span>
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
                <span>{{ row.address }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="200px">
              <template slot="header">
                <span>Operations</span>
              </template>
              <template slot-scope="{row}">
                <el-button size="mini" @click="updateBranch(row)">update</el-button>
                <el-popconfirm
                  confirm-button-text="OK"
                  cancel-button-text="No, Thanks"
                  title="Are you sure to delete this?"
                  @onConfirm="deleteBranch(row)"
                >
                  <el-button slot="reference" size="mini" type="danger">delete</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            v-if="branchData.length > 0"
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

      <!-- branch create tab-->
      <el-tab-pane label="Create Branch" name="create">
        <el-form ref="branchCreateForm" :model="branchCreateForm" :rules="branchRule" label-width="220px" style="width: 500px">
          <el-form-item label="Code :" prop="code">
            <el-input v-model="branchCreateForm.code" type="text" autocomplete="off" @input="toUpperCaseWord(branchCreateForm,'code')" />
          </el-form-item>

          <el-form-item label="Name :" prop="name">
            <el-input v-model="branchCreateForm.name" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Phone Number :" prop="phone">
            <el-input v-model="branchCreateForm.phone" type="text" autocomplete="off" />
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
                v-if="branchCreateForm.imageUrl"
                :src="branchCreateForm.imageUrl"
                class="avatar"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>-->

          <el-form-item label="Address :" prop="address">
            <el-input v-model="branchCreateForm.address" type="textarea" row="3" autocomplete="off" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="createBranch">Create</el-button>
            <el-button @click="resetCreateBranchForm">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- branch update tab -->
      <el-tab-pane label="Update Branch" name="update" :disabled="true">
        <el-form ref="branchCreateForm" :model="branchCreateForm" :rules="branchRule" label-width="220px" style="width: 500px">
          <el-form-item label="Code :" prop="code">
            <el-input
              v-model="branchCreateForm.code"
              type="text"
              autocomplete="off"
              :disabled="true"
            />
          </el-form-item>

          <el-form-item label="Name :" prop="name">
            <el-input v-model="branchCreateForm.name" type="text" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Phone Number :" prop="phone">
            <el-input v-model="branchCreateForm.phone" type="text" autocomplete="off" />
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
                v-if="branchCreateForm.imageUrl"
                :src="branchCreateForm.imageUrl"
                class="avatar"
              >
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>-->

          <el-form-item label="Address :" prop="address">
            <el-input v-model="branchCreateForm.address" type="textarea" row="3" autocomplete="off" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="updateBranchOk">Update</el-button>
            <el-button @click="resetCreateBranchForm">Reset</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { User } from "../../mixinsFile/branch";
export default {
  name: "Index",
  mixins: [User]
};
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

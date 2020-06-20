<template>
  <div class="user-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleTab(activeName)">
      <el-tab-pane label="All Users" name="view">
        <div>
          <el-input v-model="searchValue" placeholder="Please input" style="width: 250px; float: right">
            <el-button slot="append" icon="el-icon-search" @click="searchClick" />
          </el-input>
        </div>
        <div>
          <el-table
            border
            :data="usersData"
            style="width: 100%;background-color: #e9e3e3"
            highlight-current-row
          >
            <el-table-column align="center" min-width="200">
              <template slot="header">
                <span>Photo</span>
              </template>
              <template slot-scope="{row}">
                <img :src="row.imagePath === ''?baseUrl+'/shared/company_profile.jpg':baseUrl+row.imagePath" class="img-container" alt="Photo">
              </template>
            </el-table-column>

            <el-table-column align="center" min-width="200">
              <template slot="header">
                <span>user id</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.userid }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" min-width="300">
              <template slot="header">
                <span>User Name</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.username }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" min-width="200">
              <template slot="header">
                <span>Position</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.position }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" min-width="200">
              <template slot="header">
                <span>Email</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.email }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" min-width="200">
              <template slot="header">
                <span>Phone</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.phone }}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="1000">
              <template slot="header">
                <span>Permissions</span>
              </template>
              <template slot-scope="{row}">
                <el-tag v-for="(item,i) in row.permissionNames" :key="i" type="info" round>{{ item }} </el-tag>
              </template>
            </el-table-column>

            <el-table-column align="center" fixed="right" width="200px">
              <template slot="header">
                <span>Operations</span>
              </template>
              <template slot-scope="{row}">
                <el-button size="mini" @click="updateUser(row)">Edit</el-button>
                <el-popconfirm
                  confirm-button-text="OK"
                  cancel-button-text="No, Thanks"
                  title="Are you sure to delete this?"
                  @onConfirm="deleteUser(row)"
                >
                  <el-button slot="reference" size="mini" type="danger" :disabled="row.isLoginUser">delete</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            v-if="usersData.length > 0"
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
      <el-tab-pane label="Create User" name="create">
        <el-form ref="createForm" label-width="220px" style="width: 500px">
          <el-form-item label="photo" prop="photo">
            <el-upload
              style="border: 1px dashed; width: 100px; height: 100px;"
              class="avatar-uploader"
              :action="photoUploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="photoUrl" :src="photoUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item label="User Id" prop="userId">
            <el-input ref="refUserId" v-model="userCreateForm.userid" focus="true" type="text" placeholder="user id" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input
              :key="passwordType"
              ref="password"
              v-model="userCreateForm.password"
              style="width:450"
              :type="passwordType"
              placeholder="Password"
              name="password"
              auto-complete="off"
            /><span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
          <el-form-item label="Name" prop="name">
            <el-input v-model="userCreateForm.username" type="text" placeholder="user name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="userCreateForm.email" type="text" placeholder="email" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Phone no." prop="phone">
            <el-input v-model="userCreateForm.phone" type="number" placeholder="phone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Position" prop="position">
            <el-input v-model="userCreateForm.position" type="text" placeholder="position" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Department" prop="dept">
            <el-select v-model="userCreateForm.department" placeholder="Select" style="width: 280px">
              <el-option
                v-for="item in deptOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <div style="margin-left: 50px; width: 700px">
            <span>Department Permission</span>
            <div style="border: 1px solid rgb(174, 178, 183); padding: 10px">
              <el-checkbox-group v-model="userCreateForm.deptPermissions">
                <el-checkbox v-for="(item,i) in deptOptions" :key="i" :label="item.label" />
              </el-checkbox-group>
            </div>
          </div>

          <br>
          <div style="margin-left: 50px; width: 700px">
            <div style="border: 1px solid rgb(174, 178, 183); padding: 10px">
              <br>
              <span>Permission Group</span>
              <el-select v-model="premissionGroupSelectedValue" size="small" placeholder="Select" @change="setPermissionGroupValue">
                <el-option
                  v-for="item in permissionGroupList"
                  :key="item.id"
                  :label="item.groupName"
                  :value="item.permissions"
                />
              </el-select>
              <br>
              <br>
              <el-checkbox-group v-model="userCreateForm.permissions">
                <div v-for="group in groups" :key="group.menuCode">
                  <el-checkbox v-for="item in group" :key="item.permissionCode" :label="item.permissionCode" style="width:140px;" :disabled="item.permissionCode==='M000B00'?true:false" @change="handleCheckedPermissionChange">{{ item.permissionName }}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </div>
          <!-- <PermissionList v-model="userCreateForm.permission" :user-create-form="userCreateForm" /> -->

          <el-form-item>
            <el-button type="primary" @click="createOk">Create</el-button>
            <el-button @click="createReset">Reset</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>

      <!-- user update tab -->
      <el-tab-pane label="Update User" name="update" :disabled="true">
        <el-form ref="updateForm" label-width="220px" style="width: 500px">
          <el-form-item label="photo" prop="photo">
            <el-upload
              style="border: 1px dashed; width: 100px; height: 100px;"
              class="avatar-uploader"
              :action="photoUploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="photoUrl" :src="photoUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item label="User Id" prop="userId">
            <el-input ref="refUserId" v-model="userUpdateForm.userid" :disabled="true" type="text" placeholder="user id" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Password" prop="password">

            <el-input
              :key="passwordType"
              ref="password"
              v-model="userUpdateForm.password"
              :disabled="isDisablePwd"
              placeholder="Password"
              name="password"
              tabindex="2"
              auto-complete="on"
              type="password"
            />
            <span class="show-pwd" @click="editPwd">
              <svg-icon :icon-class="'edit'" />
            </span>
          </el-form-item>
          <el-form-item label="Name" prop="name">
            <el-input v-model="userUpdateForm.username" type="text" placeholder="user name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Email" prop="email">
            <el-input v-model="userUpdateForm.email" type="text" placeholder="email" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Phone no." prop="phone">
            <el-input v-model="userUpdateForm.phone" type="number" placeholder="phone" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Position" prop="position">
            <el-input v-model="userUpdateForm.position" type="text" placeholder="position" autocomplete="off" />
          </el-form-item>

          <el-form-item label="Department" prop="dept">
            <el-select v-model="userUpdateForm.department" placeholder="Select" style="width: 280px">
              <el-option
                v-for="item in deptOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <div style="margin-left: 50px; width: 700px">
            <span>Department Permission</span>
            <div style="border: 1px solid rgb(174, 178, 183); padding: 10px">
              <el-checkbox-group v-model="userUpdateForm.deptPermissions">
                <el-checkbox v-for="(item,i) in deptOptions" :key="i" :label="item.label" />
              </el-checkbox-group>
            </div>
          </div>

          <br>
          <div style="margin-left: 50px; width: 700px">
            <div style="border: 1px solid rgb(174, 178, 183); padding: 10px">
              <br>
              <span>Permission Group</span>
              <el-select v-model="premissionGroupSelectedValueForUpdate" size="small" placeholder="Select" @change="setPermissionGroupValueForUpdate">
                <el-option
                  v-for="item in permissionGroupList"
                  :key="item.id"
                  :label="item.groupName"
                  :value="item.permissions"
                />
              </el-select>
              <br>
              <br>
              <el-checkbox-group v-model="userUpdateForm.permissions">
                <div v-for="group in groups" :key="group.menuCode">
                  <el-checkbox v-for="item in group" :key="item.permissionCode" :label="item.permissionCode" style="width:140px;" :disabled="item.permissionCode==='M000B00'?true:false" @change="handleCheckedPermissionChange">{{ item.permissionName }}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </div>
          <el-form-item>
            <el-button type="primary" @click="updateOk">Update</el-button>
            <el-button @click="createReset">Reset</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { User } from '../../mixinsFile/user'
export default {
  name: 'Index',
  mixins: [User]
}
</script>

<style scoped>
  .user-container{
    margin: 30px;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    }
  .img-container {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  width: 100px;
  height: 100px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #887b7b;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 98px;
    height: 98px;
    display: block;
  }

</style>

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
            <el-table-column align="center">
              <template slot="header">
                <span>user id</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.userid }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center">
              <template slot="header">
                <span>User Name</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.username }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center">
              <template slot="header">
                <span>Position</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.position }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center">
              <template slot="header">
                <span>Email</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.email }}</span>
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
                <span>Created At</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.createdAt }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center">
              <template slot="header">
                <span>Updated At</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.updatedAt }}</span>
              </template>
            </el-table-column>

            <el-table-column align="center" width="200px">
              <template slot="header">
                <span>Operations</span>
              </template>
              <template slot-scope="{row}">
                <el-button size="mini" @click="updateUser(row)">update</el-button>
                <el-popconfirm
                  confirm-button-text="OK"
                  cancel-button-text="No, Thanks"
                  title="Are you sure to delete this?"
                  @onConfirm="deleteUser(row.id)"
                >
                  <el-button slot="reference" size="mini" type="danger">delete</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            v-if="usersData.length > 0"
            :page-sizes="[10,20,30]"
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
          <el-form-item label="User Id" prop="userId">
            <el-input v-model="userCreateForm.userId" type="text" placeholder="user id" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input v-model="userCreateForm.password" type="text" placeholder="user id" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Name" prop="name">
            <el-input v-model="userCreateForm.name" type="text" placeholder="user name" autocomplete="off" />
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
              <el-checkbox-group v-model="userCreateForm.deptPermission">
                <el-checkbox v-for="(item,i) in deptOptions" :key="i" :label="item.label" />
              </el-checkbox-group>
            </div>
          </div>

          <br>

          <PermissionList :user-create-form="userCreateForm" :permission-group-list="permissionGroupList" />
         <!-- <div style="margin-left: 50px; width: 700px">
            <span>Permission</span>
            <div style="border: 1px solid rgb(174, 178, 183); padding: 10px">
              <el-form-item label="Permission Group" prop="permissionGroup">
                <el-select v-model="userCreateForm.department" placeholder="Select" style="width: 280px">
                  <el-option
                    v-for="item in deptOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>

              <el-row>
                <el-col :span="6">
                  <el-checkbox style="float: left">User Menu</el-checkbox>
                </el-col>
                <el-col :span="18">
                  <el-checkbox-group v-model="userCreateForm.deptPermission" style="float: left">
                    <el-checkbox label="add" />
                    <el-checkbox label="update" />
                    <el-checkbox label="delete" />
                    <el-checkbox label="excel" />
                  </el-checkbox-group>
                </el-col>
              </el-row>

              <br>

              <el-row>
                <el-col :span="6">
                  <el-checkbox style="float: left">Company Menu</el-checkbox>
                </el-col>
                <el-col :span="18">
                  <el-checkbox-group v-model="userCreateForm.deptPermission" style="float: left">
                    <el-checkbox label="add" />
                    <el-checkbox label="update" />
                    <el-checkbox label="delete" />
                    <el-checkbox label="excel" />
                  </el-checkbox-group>
                </el-col>
              </el-row>

            </div>
          </div>
-->
          <br>

          <el-form-item>
            <el-button type="primary" @click="createOk">Create</el-button>
            <el-button @click="createReset">Reset</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>

      <!-- user update tab -->
      <el-tab-pane label="Update User" name="update" :disabled="true">
        <el-form ref="updateForm" label-width="220px" style="width: 500px">
          <el-form-item label="Name" prop="name">
            <el-input v-model="userUpdateForm.name" type="text" placeholder="user name" autocomplete="off" />
          </el-form-item>
          <el-form-item label="User Id" prop="userId">
            <el-input v-model="userUpdateForm.userId" type="text" placeholder="user id" autocomplete="off" />
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
import { User } from '../../mixinsFile/user'
import PermissionList from '../../components/PermissionList/index'
export default {
  name: 'Index',
  components: { PermissionList },
  mixins: [User]
}
</script>

<style scoped>
  .user-container{
    margin: 30px;
  }

</style>

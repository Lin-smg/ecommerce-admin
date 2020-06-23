<template>
  <div class="user-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleTab(activeName)">
      <el-tab-pane label="All Permission Group" name="view">
        <div>
          <el-input v-model="searchValue" placeholder="Please input" style="width: 250px; float: right">
            <el-button slot="append" icon="el-icon-search" @click="searchClick" />
          </el-input>
        </div>
        <div>
          <el-table
            border
            :data="permissionGroupData"
            style="width: 100%;background-color: #e9e3e3"
            highlight-current-row
          >
            <el-table-column align="center">
              <template slot="header">
                <span>Group Code</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.groupCode }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center">
              <template slot="header">
                <span>Group Name</span>
              </template>
              <template slot-scope="{row}">
                <span>{{ row.groupName }}</span>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot="header">
                <span>Permissions</span>
              </template>
              <template slot-scope="{row}">
                <el-tag v-for="(item,i) in row.permissionNames" :key="i" size="mini" style="margin-right: 5px;" type="info" round>{{ item }} </el-tag>
              </template>
            </el-table-column>

            <el-table-column align="center" width="200px">
              <template slot="header">
                <span>Operations</span>
              </template>
              <template slot-scope="{row}">
                <el-button size="mini" @click="updateData(row)">edit</el-button>
                <el-popconfirm
                  confirm-button-text="OK"
                  cancel-button-text="No, Thanks"
                  title="Are you sure to delete this?"
                  @onConfirm="deleteData(row)"
                >
                  <el-button slot="reference" size="mini" type="danger">delete</el-button>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            v-if="permissionGroupData.length > 0"
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
      <el-tab-pane label="Create Permission Group" name="create">
        <el-form ref="groupPermissionCreateForm" :model="groupPermissionCreateForm" label-width="220px" style="width: 500px">
          <el-form-item label="Group Code" prop="groupCode">
            <el-input v-model="groupPermissionCreateForm.groupCode" type="text" placeholder="Group Code" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Group Name" prop="groupName">
            <el-input v-model="groupPermissionCreateForm.groupName" type="text" placeholder="Group Name" autocomplete="off" />
          </el-form-item>
          <div style="margin-left: 50px; width: 700px">
            <span>Permission</span>
            <div style="border: 1px solid rgb(174, 178, 183); padding: 10px">
              <el-checkbox-group v-model="groupPermissionCreateForm.permissions">
                <div v-for="group in groups" :key="group.menuCode">
                  <el-checkbox v-for="item in group" :key="item.permissionCode" :label="item.permissionCode" style="width:140px;" :disabled="item.permissionCode==='M000B00'?true:false" @change="handleCheckedPermissionChange">{{ item.permissionName }}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </div>
          <el-form-item>
            <el-button type="primary" @click="createOk">Create</el-button>
            <el-button @click="createReset">Reset</el-button>
          </el-form-item>
        </el-form>

      </el-tab-pane>

      <!-- unit update tab -->
      <el-tab-pane label="Update Unit" name="update" :disabled="true">
        <el-form ref="groupPermissionUpdateForm" :model="groupPermissionUpdateForm" label-width="220px" style="width: 500px">
          <el-form-item label="Group Code" prop="groupCode">
            <el-input v-model="groupPermissionUpdateForm.groupCode" type="text" placeholder="Group Code" autocomplete="off" />
          </el-form-item>
          <el-form-item label="Group Name" prop="groupName">
            <el-input v-model="groupPermissionUpdateForm.groupName" type="text" placeholder="Group Name" autocomplete="off" />
          </el-form-item>
          <div style="margin-left: 50px; width: 700px">
            <span>Permission</span>
            <div style="border: 1px solid rgb(174, 178, 183); padding: 10px">
              <el-checkbox-group v-model="groupPermissionUpdateForm.permissions">
                <div v-for="group in groups" :key="group.menuCode">
                  <el-checkbox v-for="item in group" :key="item.permissionCode" :label="item.permissionCode" style="width:140px;" :disabled="item.permissionCode==='M000B00'?true:false" @change="handleCheckedPermissionChangeForUpdate">{{ item.permissionName }}</el-checkbox>
                </div>
              </el-checkbox-group>
            </div>
          </div>
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
import { PermissionGroup } from '../../mixinsFile/permission'
export default {
  name: 'Index',
  mixins: [PermissionGroup]
}
</script>

<style scoped>
  .user-container{
    margin: 30px;
  }

</style>

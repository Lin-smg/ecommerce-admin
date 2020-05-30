<template>
  <div class="permission-container">
    <div style="margin-left: 50px; width: 700px">
      <span>Permission</span>
      <div style="border: 1px solid rgb(174, 178, 183); padding: 10px">
        <el-form-item label="Permission Group" prop="permissionGroup">
          <el-select v-model="permissionGroup" placeholder="Select" style="width: 280px">
            <el-option
              v-for="item in permissionGroupList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-row v-for="permission in allPermission">
<!--          <el-col :span="6">-->
<!--            <el-checkbox style="float: left">{{ permission.menuCode }}</el-checkbox>-->
<!--          </el-col>-->
          <el-col :span="18">
            <el-checkbox-group v-model="userCreateForm.deptPermission" style="float: left">
              <el-checkbox v-for="i in permission.info" :label="i.permissionName" />
            </el-checkbox-group>
          </el-col>
        </el-row>

        <br>

<!--        <el-row>-->
<!--          <el-col :span="6">-->
<!--            <el-checkbox style="float: left">Company Menu</el-checkbox>-->
<!--          </el-col>-->
<!--          <el-col :span="18">-->
<!--            <el-checkbox-group v-model="userCreateForm.deptPermission" style="float: left">-->
<!--              <el-checkbox label="add" />-->
<!--              <el-checkbox label="update" />-->
<!--              <el-checkbox label="delete" />-->
<!--              <el-checkbox label="excel" />-->
<!--            </el-checkbox-group>-->
<!--          </el-col>-->
<!--        </el-row>-->

      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'Index',
  props: {
    userCreateForm: {
      type: Object,
      required: true
    },
    // deptOptions: {
    //   type: Array,
    //   required: true
    // },
    // permissionGroup: {
    //   type: Object,
    //   required: true
    // },
    permissionGroupList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      permissionGroup: '',
      allPermission: []
    }
  },
  created() {
    this.allPermission = this.$store.getters.allPermission
    console.log('per per per', this.allPermission)
  }
}
</script>

<style scoped>
  .permission-container {
    /*margin: 10px*/
  }

</style>

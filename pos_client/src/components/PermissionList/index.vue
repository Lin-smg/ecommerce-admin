<template>
  <div class="permission-container">
    <div style="margin-left: 50px; width: 700px">
      <span>Permission</span>
      <div style="border: 1px solid rgb(174, 178, 183); padding: 10px">
        <el-form-item label="Permission Group" prop="permissionGroup">
          <el-select v-model="permissionGroup" placeholder="Select" style="width: 280px">
            <el-option
              v-for="item in allPermission"
              :key="item.permissionName"
              :label="item.permissionName"
              :value="item.permissionName"
            />
          </el-select>

          <div style="height:25px;" />
          <el-checkbox-group v-model="userCreateForm.permission">
            <div v-for="group in groups" :key="group.menuCode">
              <el-checkbox v-for="item in group" :key="item.permissionCode" :label="item.permissionCode" style="width:140px;" @change="handleCheckedPermissionChange">{{ item.permissionName }}</el-checkbox>
            </div>
          </el-checkbox-group>

        </el-form-item>

      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
export default {
  name: 'Index',
  // props: {
  //   userCreateForm: {
  //     type: Object,
  //     required: true
  //   }
  // },
  data() {
    return {
      userCreateForm: {
        permission: []
      }
    }
  },
  computed: {
    groups() {
      return groupBy(this.allPermission, 'menuCode')
    }
  },
  created() {
    this.allPermission = store.getters.allPermission
  },
  methods: {
    handleCheckedPermissionChange(value) {
      var checkedList = this.userCreateForm.permission
      const uniqueCheckList = new Set()
      checkedList.forEach(element => {
        const checkedValueMenuCode = element.toString().substring(0, 4)
        uniqueCheckList.add(checkedValueMenuCode + 'B00')
        uniqueCheckList.add(element)
      })
      this.userCreateForm.permission = []
      this.userCreateForm.permission = Array.from(uniqueCheckList)
    }
  }
}

function groupBy(array, key) {
  const result = {}
  array.forEach(item => {
    if (!result[item[key]]) {
      result[item[key]] = []
    }
    result[item[key]].push(item)
  })
  return result
}
</script>

<style scoped>

</style>

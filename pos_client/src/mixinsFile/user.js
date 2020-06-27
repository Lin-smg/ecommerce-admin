import { getUserList, deletePhoto } from '@/api/user'
export const User = {
  name: 'Index',
  data() {
    return {
      activeName: 'view',
      pageSize: 10,
      pageIndex: 1,
      usersData: [],
      totalCount: 0,
      userCreateForm: this.initUserForm(),
      userUpdateForm: this.initUserForm(),
      searchValue: '',
      allBranchList: [],
      permissionGroupList: [],
      premissionGroupSelectedValue: '',
      premissionGroupSelectedValueForUpdate: '',
      selectDeptObject: '',
      loading: false,
      passwordType: 'password',
      isDisablePwd: true,
      loginUserId: this.$store.getters.userid,
      photoUploadUrl: '',
      photoUrl: '',
      oldFileName: '',
      baseUrl: process.env.VUE_APP_BASE_API,
      rules: {
        userid: [
          { required: true, message: 'Please input User Id', trigger: 'blur' },
          { min: 5, message: 'Length should be minium 5', trigger: 'blur' }
        ],
        username: [
          { required: true, message: 'Please input User Name', trigger: 'blur' },
          { min: 5, message: 'Length should be minium 5', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please input Password', trigger: 'blur' },
          { min: 6, message: 'Length should be minium 6', trigger: 'blur' }
        ],
        selectDeptObject: [
          { required: true, message: 'Please input Branch', trigger: 'blur' },
          { min: 6, message: 'Length should be minium 6', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.photoUploadUrl = this.baseUrl + '/shared/userIMG'
    this.getUsers()
  },
  computed: {
    groups() {
      return groupBy(this.$store.getters.allPermission, 'menuCode')
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      // const isJPG = file.type === 'image/jpeg'
      // const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Avatar picture size can not exceed 2MB!')
      }
      return isLt2M
    },
    handleAvatarSuccess(res, file) {
      if (this.oldFileName !== '') {
        deletePhoto({ fileName: `./files/${this.oldFileName}` })
      }
      this.oldFileName = res.filename
      this.userCreateForm.imagePath = `/shared/${res.filename}`
      this.userUpdateForm.imagePath = `/shared/${res.filename}`
      this.photoUrl = URL.createObjectURL(file.raw)
    },
    editPwd() {
      this.isDisablePwd = !this.isDisablePwd
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    initUserForm() {
      return {
        userid: '',
        password: '',
        username: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        departmentname: '',
        departmentpermissions: [],
        permissions: ['M000B00'],
        imagePath: ''
      }
    },
    setPermissionGroupValue() {
      this.userCreateForm.permissions = []
      var str = this.premissionGroupSelectedValue.replace('{', '[')
      str = JSON.parse(str.replace('}', ']'))
      this.userCreateForm.permissions = str
    },
    setPermissionGroupValueForUpdate() {
      this.userUpdateForm.permissions = []
      var str = this.premissionGroupSelectedValueForUpdate.replace('{', '[')
      str = JSON.parse(str.replace('}', ']'))
      this.userUpdateForm.permissions = str
    },
    handleCheckedPermissionChange(value) {
      var checkedList = this.userCreateForm.permissions
      const uniqueCheckList = new Set()
      checkedList.forEach(element => {
        const checkedValueMenuCode = element.toString().substring(0, 4)
        uniqueCheckList.add(checkedValueMenuCode + 'B00')
        uniqueCheckList.add(element)
      })
      this.userCreateForm.permissions = []
      this.userCreateForm.permissions = Array.from(uniqueCheckList)
    },
    async getUsers() {
      const params = {
        group: '',
        sort: '',
        cur_page: this.pageIndex,
        per_page: this.pageSize,
        q: this.searchValue ? this.searchValue : ''
      }

      this.listLoading = true
      getUserList(params).then(response => {
        // this.usersData = response.data
        this.userCreateForm = this.initUserForm()
        this.userUpdateForm = this.initUserForm()
        this.selectDeptObject = ''
        this.photoUrl = ''
        this.usersData = []
        this.permissionGroupList = response.permissionGroup
        this.allBranchList = response.allBranch
        this.pageIndex = response.meta.curPage
        this.pageSize = response.meta.perPage
        this.totalCount = response.meta.totalResults
        if (response.data !== '') {
          for (const data of response.data) {
            let obj = this.initUserForm()
            obj = data
            if (data.imagePath && data.imagePath !== null && data.imagePath !== '') {
              obj.imagePath = data.imagePath
            } else {
              obj.imagePath = ''
            }
            if (data.userid === this.$store.getters.curUserInfo.userid) {
              obj.isLoginUser = true
            } else {
              obj.isLoginUser = false
            }
            var str = data.permissions.replace('{', '')
            str = str.replace('}', '')
            str = str.replace(/"/g, '')
            const pdataList = str.split(',')
            obj.permissions = pdataList
            obj.permissionNames = this.getPermissionNameFromCode(pdataList)

            var deptStr = data.departmentpermissions.replace('{', '')
            deptStr = deptStr.replace('}', '')
            deptStr = deptStr.replace(/"/g, '')
            const deptdataList = deptStr.split(',')
            obj.departmentpermissions = deptdataList
            obj.departmentname = this.getDepartmentNameFromCode(data.department)
            obj.departmentpermissionsname = this.getDepartmentNameListFromCode(deptdataList)
            this.usersData.push(obj)
          }
          this.listLoading = false
        }
      })
    },

    getPermissionNameFromCode(data) {
      const result = []
      const allPermission = this.$store.getters.allPermission
      for (const obj of data) {
        result.push(allPermission.find(({ permissionCode }) => permissionCode === obj).permissionName)
      }
      return result
    },
    getDepartmentNameListFromCode(data) {
      const result = []
      const all = this.allBranchList
      for (const obj of data) {
        let robj = {
          code: '',
          name: ''
        }
        robj = all.find(({ code }) => code === obj)
        if (robj) {
          result.push(robj.name)
        }
      }
      return result
    },
    getDepartmentNameFromCode(data) {
      let result = {
        code: '',
        name: ''
      }
      const all = this.allBranchList
      result = (all.find(({ code }) => code === data))
      if (result) {
        return result.name
      }
      result
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getUsers()
    },

    handleCurrentChange(val) {
      this.pageIndex = val
      this.getUsers()
    },

    searchClick() {
      this.getUsers()
    },

    async createOk() {
      // this.$refs.userCreateForm.validate(valid => {
      //   if (valid) {
      this.userCreateForm.department = this.selectDeptObject.code
      this.userCreateForm.departmentname = this.selectDeptObject.name
      this.loading = true
      this.$store.dispatch('user/createUser', this.userCreateForm).then(() => {
        this.handleTab('view')
        this.getUsers()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },

    createReset() {

    },

    deleteUser(data) {
      // this.$refs.userCreateForm.validate(valid => {
      //   if (valid) {
      this.loading = true
      this.$store.dispatch('user/deleteUser', data).then(() => {
        this.handleTab('view')
        this.getUsers()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },

    updateOk() {
      // this.$refs.userCreateForm.validate(valid => {
      //   if (valid) {
      this.userUpdateForm.department = this.selectDeptObject.code
      this.userUpdateForm.departmentname = this.selectDeptObject.name
      this.loading = true
      this.$store.dispatch('user/updateUser', this.userUpdateForm).then(() => {
        this.handleTab('view')
        this.getUsers()
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    },

    updateReset() {

    },

    updateUser(data) {
      this.userUpdateForm.userid = data.userid
      this.userUpdateForm.password = data.password
      this.userUpdateForm.username = data.username
      this.userUpdateForm.email = data.email
      this.userUpdateForm.phone = data.phone
      this.userUpdateForm.position = data.position
      const obj = {
        code: data.department,
        name: data.departmentname
      }
      this.selectDeptObject = obj
      this.userUpdateForm.departmentpermissions = data.departmentpermissions
      this.userUpdateForm.permissions = data.permissions
      this.userUpdateForm.imagePath = data.imagePath
      this.photoUrl = this.baseUrl + data.imagePath
      if (data.imagePath !== '') {
        this.oldFileName = data.imagePath.substring(data.imagePath.lastIndexOf('/'))
      } else {
        this.oldFileName = ''
      }
      this.handleTab('update')
    },

    handleTab(tab) {
      this.premissionGroupSelectedValue = ''
      this.premissionGroupSelectedValueForUpdate = ''
      this.userCreateForm = this.initUserForm()
      if (tab === 'view') {
        this.getUsers()
      }
      if (tab === 'create') {
        this.selectDeptObject = ''
        this.photoUrl = ''
      }
      this.activeName = tab
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

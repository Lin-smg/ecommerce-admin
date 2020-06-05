import { getUserList } from '@/api/user'
export const User = {
  name: 'Index',
  data() {
    return {
      activeName: 'view',
      pageSize: 10,
      pageIndex: 1,
      usersData: [],
      totalCount: 0,
      userCreateForm: {
        userid: '',
        password: '',
        username: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        deptPermissions: [],
        permissions: []
      },
      userUpdateForm: {
        name: '',
        userId: ''
      },
      searchValue: '',
      deptOptions: [
        {
          value: 'dept1',
          label: 'dept1'
        },
        {
          value: 'dept2',
          label: 'dept2'
        }
      ],
      permissionGroupList: [
        {
          value: 'permission1',
          label: 'permission1'
        },
        {
          value: 'permission2',
          label: 'permission2'
        }
      ]
    }
  },
  created() {
    this.getUsers()
  },
  computed: {
    groups() {
      return groupBy(this.$store.getters.allPermission, 'menuCode')
    }
  },
  methods: {

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
        this.usersData = response.data
        this.pageIndex = response.meta.curPage
        this.pageSize = response.meta.perPage
        this.totalCount = response.meta.totalResults
        this.listLoading = false
        console.log('request', params)
        console.log('user data', response)
        console.log('user count', this.totalCount)
      })
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
      console.log('delete', data)
    },

    updateOk() {

    },

    updateReset() {

    },

    updateUser(data) {
      console.log('update', data)
      this.userUpdateForm.name = data.username
      this.userUpdateForm.userId = data.userid
      this.handleTab('update')
    },

    handleTab(tab) {
      console.log(tab)
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

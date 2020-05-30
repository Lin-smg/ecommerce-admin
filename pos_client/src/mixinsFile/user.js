import * as http from '@/utils/http'
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
        userId: '',
        password: '',
        name: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        deptPermission: []
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
  methods: {
    async getUsers() {
      const params = {
        group: '',
        sort: '',
        cur_page: this.pageIndex,
        per_page: this.pageSize,
        q: this.searchValue ? this.searchValue : ''
      }
      const res = await http.sendForGet('users', params)
      this.usersData = res.data.users
      this.pageIndex = res.data.meta.curPage
      this.pageSize = res.data.meta.perPage
      this.totalCount = res.data.meta.totalResults
      console.log('request', params)
      console.log('user data', res)
      console.log('user count', this.totalCount)
    },

    searchClick(){
      this.getUsers()
    },

    createOk() {

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

    handleSizeChange(val) {
      this.pageSize = val
      this.getUsers()
    },
    handleCurrentChange(val) {
      this.pageIndex = val
      this.getUsers()
    },

    handleTab(tab) {
      console.log(tab)
      this.activeName = tab
    }
  }

}

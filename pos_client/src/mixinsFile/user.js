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

    handleTab(tab) {
      console.log(tab)
      this.activeName = tab
    }
  }

}

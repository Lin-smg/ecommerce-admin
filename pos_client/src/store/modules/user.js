import { getInfo, login, createUser, updateUser, deleteUser } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const data = require('@/utils/permission').permission

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    curUserInfo: null,
    allPermission: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERID: (state, userid) => {
    state.userid = userid
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_CURUSERINFO: (state, info) => {
    state.curUserInfo = info
  },
  SET_ALLPERMISSION: (state, permission) => {
    state.allPermission = permission
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { userid, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userid: userid.trim(), password: password })
        .then(response => {
          commit('SET_TOKEN', response.token.accessToken)
          setToken(response.token.accessToken)
          resolve()
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },

  // get user info
  async getInfo({ commit, state }) {
    return await new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          console.log('User >>>>>>>>>>', JSON.stringify(data))
          commit('SET_USERID', response.user.userid)
          commit('SET_AVATAR', response.user.avatar)
          commit('SET_CURUSERINFO', response.user)
          commit('SET_ALLPERMISSION', response.permission.length !== 0 ? response.permission : data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // Create User
  async createUser({ commit }, userForm) {
    return await new Promise((resolve, reject) => {
      createUser(userForm)
        .then(response => {
          resolve(resolve)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },

  // Delete User
  async deleteUser({ commit }, userForm) {
    return await new Promise((resolve, reject) => {
      deleteUser(userForm)
        .then(response => {
          resolve(resolve)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },

  // Create User
  async updateUser({ commit }, userForm) {
    return await new Promise((resolve, reject) => {
      updateUser(userForm.userid, userForm)
        .then(response => {
          resolve(resolve)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // get current user info
  setCurUserInfo({ commit }, info) {
    commit('SET_CURUSERINFO', info)
  },

  // set permission
  setAllPermission({ commit }, permission) {
    commit('SET_ALLPERMISSION', permission)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

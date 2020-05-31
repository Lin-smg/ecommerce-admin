import { getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { loginPost } from '@/utils/http'
import { resetRouter } from '@/router'

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
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
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
      loginPost('auth/login', { userid: userid.trim(), password: password }).then(response => {
        const { data } = response
        console.log(data.token.accessToken)
        commit('SET_TOKEN', data.token.accessToken)
        setToken(data.token.accessToken)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
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

      // logout(state.token).then(() => {
      //   removeToken() // must remove  token  first
      //   resetRouter()
      //   commit('RESET_STATE')
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
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


import { createMainCategory, updateMainCategory, deleteMainCategory } from '@/api/mainCategory'
import { getToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // Create Category
  async createMainCategory({ commit }, category) {
    return await new Promise((resolve, reject) => {
      createMainCategory(category)
        .then(response => {
          resolve(resolve)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },

  // Delete Category
  async deleteMainCategory({ commit }, category) {
    return await new Promise((resolve, reject) => {
      deleteMainCategory(category)
        .then(response => {
          resolve(resolve)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },

  // Create Category
  async updateMainCategory({ commit }, category) {
    return await new Promise((resolve, reject) => {
      updateMainCategory(category.categoryCode, category)
        .then(response => {
          resolve(resolve)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

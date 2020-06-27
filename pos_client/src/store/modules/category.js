import { createCategory, updateCategory, deleteCategory } from '@/api/category'
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
  async createCategory({ commit }, category) {
    return await new Promise((resolve, reject) => {
      createCategory(category)
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
  async deleteCategory({ commit }, category) {
    return await new Promise((resolve, reject) => {
      deleteCategory(category)
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
  async updateCategory({ commit }, category) {
    return await new Promise((resolve, reject) => {
      updateCategory(category.categoryCode, category)
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

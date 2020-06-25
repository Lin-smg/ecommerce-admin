import { createSupplier, updateSupplier, deleteSupplier } from '@/api/supplier'
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
  // Create Supplier
  async createSupplier({ commit }, supplierForm) {
    return await new Promise((resolve, reject) => {
      createSupplier(supplierForm)
        .then(response => {
          resolve(resolve)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },

  // Update Supplier
  async updateSupplier({ commit }, supplierForm) {
    return await new Promise((resolve, reject) => {
      updateSupplier(supplierForm.id, supplierForm)
        .then(response => {
          resolve(resolve)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },

  // Delete Supplier
  async deleteSupplier({ commit }, data) {
    return await new Promise((resolve, reject) => {
      deleteSupplier(data)
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

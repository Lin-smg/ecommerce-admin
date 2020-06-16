import { createPermissionGroup, updatePermissionGroup, deletePermissionGroup } from '@/api/permission'

const getDefaultState = () => {
  return {
    // childUnitList: []
  }
}

const state = getDefaultState()

const mutations = {}

const actions = {
  // Create Unit
  async createPermissionGroup({ commit }, formData) {
    return await new Promise((resolve, reject) => {
      createPermissionGroup(formData).then(response => {
        resolve(resolve)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  // Update Unit
  async updatePermissionGroup({ commit }, formData) {
    return await new Promise((resolve, reject) => {
      updatePermissionGroup(formData.groupCode, formData).then(response => {
        resolve(resolve)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  // Update Unit
  async deletePermissionGroup({ commit }, data) {
    return await new Promise((resolve, reject) => {
      deletePermissionGroup(data).then(response => {
        resolve(resolve)
      }).catch(error => {
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


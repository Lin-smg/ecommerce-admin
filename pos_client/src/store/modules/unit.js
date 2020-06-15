import { createUnit, updateUnit, deleteUnit } from '@/api/unit'

const getDefaultState = () => {
  return {
    // childUnitList: []
  }
}

const state = getDefaultState()

const mutations = {}

const actions = {
  // Create Unit
  async createUnit({ commit }, unitForm) {
    return await new Promise((resolve, reject) => {
      createUnit(unitForm).then(response => {
        resolve(resolve)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  // Update Unit
  async updateUnit({ commit }, unitForm) {
    return await new Promise((resolve, reject) => {
      updateUnit(unitForm.id, unitForm).then(response => {
        resolve(resolve)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },
  // Update Unit
  async deleteUnit({ commit }, data) {
    return await new Promise((resolve, reject) => {
      deleteUnit(data).then(response => {
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


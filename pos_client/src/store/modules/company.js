import { createCompany } from '@/api/company'

const getDefaultState = () => {
  return {
    // childUnitList: []
  }
}

const state = getDefaultState()

const mutations = {}

const actions = {
  // Create Unit
  async createCompany({ commit }, formData) {
    return await new Promise((resolve, reject) => {
      createCompany(formData).then(response => {
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


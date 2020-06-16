import { createWarehouse } from '@/api/warehouse'

const getDeafultState = () => {
  return {
  }
}

const state = getDeafultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDeafultState())
  }

}

const actions = {

  // Create Warehouse
  async createWarehouse({ commit }, warehouseForm) {
    return await new Promise((resolve, reject) => {
      createWarehouse(warehouseForm).then(response => {
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


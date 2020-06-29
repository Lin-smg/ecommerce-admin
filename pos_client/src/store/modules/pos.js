import { createPOSPay, createPOSOrder } from '@/api/pos'
const actions = {

  async createPOSPay({ commit }, data) {
    return await new Promise((resolve, reject) => {
      createPOSPay(data).then(response => {
        resolve(resolve)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  async createPOSOrder({ commit }, data) {
    return await new Promise((resolve, reject) => {
      createPOSOrder(data).then(response => {
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
  actions
}

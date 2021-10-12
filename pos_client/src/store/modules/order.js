import { updateOrder, deleteOrder } from '@/api/order'
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
  async updateOrder({ commit }, data) {
    return await new Promise((resolve, reject) => {
      updateOrder(data.orderNo, data).then(response => {
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

import { savePurchaseData, updateProduct, deleteProduct } from '@/api/purchase'

const actions = {
  // Create Product
  async savePurchaseData({ commit }, formData) {
    return await new Promise((resolve, reject) => {
      savePurchaseData(formData).then(response => {
        resolve(resolve)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  // Delete Product
  async deleteProduct({ commit }, formData) {
    return await new Promise((resolve, reject) => {
      deleteProduct(formData).then(response => {
        resolve(resolve)
      }).catch(error => {
        console.log(error)
        reject(error)
      })
    })
  },

  // Create Product
  async updateProductData({ commit }, formData) {
    return await new Promise((resolve, reject) => {
      updateProduct(formData.productCode, formData).then(response => {
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


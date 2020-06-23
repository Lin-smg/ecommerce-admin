import { createProduct, updateProduct, deleteProduct } from '@/api/product'

const actions = {
  // Create Product
  async createProduct({ commit }, formData) {
    return await new Promise((resolve, reject) => {
      createProduct(formData).then(response => {
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
  async updateProduct({ commit }, formData) {
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


import { createCustomer, updateCustomer, deleteCustomer } from "@/api/customer";
import { getToken } from "@/utils/auth";

const getDefaultState = () => {
  return {
    token: getToken()
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  }
};

const actions = {
  // Create Customer
  async createCustomer({ commit }, customerForm) {
    return await new Promise((resolve, reject) => {
      createCustomer(customerForm)
        .then(response => {
          resolve(resolve);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },

  // Update Customer
  async updateCustomer({ commit }, customerForm) {
    return await new Promise((resolve, reject) => {
      updateCustomer(customerForm.id, customerForm)
        .then(response => {
          resolve(resolve);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },

  //Delete customer
  async deleteCustomer({ commit }, data) {
    return await new Promise((resolve, reject) => {
      deleteCustomer(data)
        .then(response => {
          resolve(resolve);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

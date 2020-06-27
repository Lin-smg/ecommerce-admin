import { createBrand, updateBrand, deleteBrand } from "@/api/brand";
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
  // Create Brand
  async createBrand({ commit }, brandForm) {
    return await new Promise((resolve, reject) => {
      createBrand(brandForm)
        .then(response => {
          resolve(resolve);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },

  // Update Brand
  async updateBrand({ commit }, brand) {
    return await new Promise((resolve, reject) => {
      updateBrand(brand.brandCode, brand)
        .then(response => {
          resolve(resolve);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },

  //Delete Branch
  async deleteBrand({ commit }, data) {
    return await new Promise((resolve, reject) => {
        deleteBrand(data)
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

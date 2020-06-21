import { createBranch, updateBranch, deleteBranch } from "@/api/branch";
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
  // Create Branch
  async createBranch({ commit }, branchForm) {
    return await new Promise((resolve, reject) => {
      createBranch(branchForm)
        .then(response => {
          resolve(resolve);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },

  // Update Branch
  async updateBranch({ commit }, branchForm) {
    return await new Promise((resolve, reject) => {
      updateBranch(branchForm.code, branchForm)
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
  async deleteBranch({ commit }, data) {
    return await new Promise((resolve, reject) => {
      deleteBranch(data)
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

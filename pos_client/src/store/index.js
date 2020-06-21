import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import warehouse from './modules/warehouse'
import unit from './modules/unit'
import permission from './modules/permission'
import customer from './modules/customer'
import company from './modules/company'
import supplier from './modules/supplier'
import category from './modules/category'
import branch from './modules/branch'
import brand from './modules/brand'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    unit,
    permission,
    warehouse,
    customer,
    company,
    supplier,
    category,
    supplier,
    branch,
    brand
  },
  getters

})

export default store

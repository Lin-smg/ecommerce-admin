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

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    unit,
    permission,
    warehouse,
    customer
  },
  getters

})

export default store

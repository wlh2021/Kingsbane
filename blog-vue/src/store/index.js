import { createStore } from 'vuex'
import { addVisits,getVisits } from "../api/visit"
export default createStore({
  state: {
    //遮罩层旗子
    maskFlag: false,
    visits: '',
  },
  mutations: {
    SET_MASKFLAG(state) {
      state.maskFlag = !state.maskFlag
    },
    SET_VISITS: (state, visits) => {
      state.visits = visits
    },
  },
  actions: {
    Visits({ commit }, num) {
      return new Promise((resolve, reject) => {
        if (num == 0) {
          
          getVisits().then(res => {
            console.log("不增加浏览量")
            console.log(res.data)
            commit('SET_VISITS', res.data)
          })
        } else {
          
          addVisits().then(res => {
            console.log("增加浏览量")
            console.log(res.data)
            commit('SET_VISITS', res.data)
          })
        }
        resolve()
      }).catch(error => {
        reject(error)
      })
    }
  },
  modules: {
  }
})

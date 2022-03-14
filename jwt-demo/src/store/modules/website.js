import { get } from "js-cookie"
import { addVisits,getVisits } from "../../api/visit"

const website = {
    state: {
        visits: ''
    },
    mutations: {
        SET_VISITS: (state, visits) => {
            state.visits = visits
        }
    },
    actions: {
        Visits({ commit },num) {
            return new Promise((resolve, reject) => {
                if(num == 0){
                    getVisits().then(res => {
                        commit('SET_VISITS', res.data)
                    })
                }else{
                    addVisits().then(res => {
                        commit('SET_VISITS', res.data)
                    })
                }
                resolve()
            }).catch(error => {
                reject(error)
            })
        }
    }
}

export default website
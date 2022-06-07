
// 引入
import { createStore } from "vuex";
import { queryPayMoney, getGoods } from '/src/api'
import { wallet } from '/src/abi'

export default createStore({
  // 声明变量
  state: {
    tokens: null
  },
  mutations: {
    setTokenst(state, value) {
      state.tokens = value
    }
  },
  actions: {
    async getWallet(context) {
      const {dt = 0,srs = 0} = await queryPayMoney({ address: wallet.accounts[0] })
      const res = await getGoods({ address: wallet.accounts[0] })
      context.commit('setTokenst', {
        dt,
        srs,
        super: res[0][2],
        superDebris: res[1][2]
        // good
      })
    },
  },
  modules: {},
});


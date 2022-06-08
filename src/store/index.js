import { createStore } from 'vuex';
import { web3Send } from '../utils';
import { ElNotification } from 'element-plus';
import { mintContractAddress, busdContractAddress } from '../config/contract';
import { metaMaskDownload, netWorks } from '../config';
import bep20ABI from '../config/bep20_abi.json';
import dogeNftABI from '../config/dogeNft_abi.json';
import { queryPayMoney, getGoods } from '/src/api'
import { wallet } from '/src/abi'

const local_nets = localStorage.getItem('net')

export default createStore({
  state() {
    return {

      metaMaskNetWork: local_nets && JSON.parse(local_nets) || {},
      account: localStorage.getItem('account') || '',
      chainId: '',
      errorNet: false,
      isAuth: false,   //是否授权了
      busdContract: null,
      mintContract: null,
      mintLoading: false,
      totalSupply: 0,
      tokens: null,
      inviteList: []
    }
  },
  mutations: {
    setTokenst(state, value) {
      state.tokens = value
    },
    setInviteList(state, value) {
      state.inviteList = value
    },

    saveState(state, { key, value }) {
      state[key] = value
    },
    saveAccount(state, account) {
      localStorage.setItem('account', account || '')
      state.account = account
    },
    saveMetaMaskNetWork(state, net) {
      localStorage.setItem('net', JSON.stringify(net) || {})
      state.metaMaskNetWork = net
    },
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
    async connect({ state, commit, dispatch }) {
      if (window.ethereum === null) {
        window.location = metaMaskDownload;
        return false;
      }
      const ethereum = window.ethereum;
      let web3 = null;
      if (window.web3) {
        web3 = new window.Web3(ethereum);
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts'
        })
        const chainId = await ethereum.request({
          method: 'eth_chainId'
        })
        commit('saveAccount', accounts[0]);
        dispatch('changeChainId', chainId)
      }
    },
    subscribeChain({ commit, dispatch }) {
      console.log('subscribeChain');
      const ethereum = window.ethereum;
      if (!ethereum) {
        return;
      }
      ethereum.on('connect', (accounts) => {
        dispatch('connect')
      })
      ethereum.on('accountsChanged', async (accounts) => {
        commit('saveAccount', accounts[0]);
        dispatch('isApprove');
      })
      ethereum.on('chainIdChanged', chainID => {
        console.log('chainIdChanged-' + chainID);
      })
      ethereum.on('chainChanged', (event) => {
        console.log('changeChainId', event);
        dispatch('changeChainId', event);
      })
      ethereum.on('disconnect', e => {
        console.log('disconnect-------', e);
        // 清空钱包连接类型
        localStorage.removeItem('account')
        commit("saveAccount", '')
      })
    },
    changeChainId({ state, commit, dispatch }, chainId) {
      commit('saveState', { key: 'chainId', value: chainId });
      const cName = netWorks.filter(
        (it) => parseInt(it.chainId) === parseInt(chainId)
      );
      cName[0] ? commit('saveState', { key: 'errorNet', value: false }) : commit('saveState', { key: 'errorNet', value: true });
      if (cName[0]) {
        dispatch('isApprove');
      }
    },
    async switchChainId({ commit }, chainObj) {
      const ethereum = window.ethereum;
      const { chainId, rpcUrls, chainName } = chainObj;
      const chainId_16 = `0x${(Number(chainId)).toString(16)}`
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainId_16 }],
        });
        commit('saveMetaMaskNetWork', { ...chainObj })
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{ chainId: chainId_16, rpcUrls: Array.from(rpcUrls), chainName }],
            });
            commit('saveMetaMaskNetWork', { ...chainObj })
          } catch (addError) {
            console.log(addError, 'error');
            ElNotification({
              title: "Error",
              message: addError,
              type: 'error'
            })
          }
        }
      }
    },
    async isApprove({ state, commit, dispatch }) {
      const { account, errorNet } = state;
      if (errorNet) {
        ElNotification({
          title: "Error",
          message: "You are on the wrong network",
          type: 'error'
        });
        return;
      }
      if (!account) {
        dispatch('connect');
        return;
      }
      const web3 = new window.Web3(window.ethereum);
      const busdContract = new web3.eth.Contract(bep20ABI, busdContractAddress);
      commit('saveState', { key: 'busdContract', value: busdContract })
      try {
        const authorize = await busdContract.methods.allowance(account, mintContractAddress).call();
        if (authorize < 100 * 10 ** 18) {
          commit('saveState', { key: 'isAuth', value: false })
        } else {
          commit('saveState', { key: 'isAuth', value: true })
        }
      } catch (error) {
        console.log(error);
      }



    },
    getApprove({ state, commit }, account) {
      const { busdContract } = state;
      const web3 = new window.Web3(window.ethereum);
      commit('saveState', { key: 'mintLoading', value: true })
      web3Send({
        currentContract: busdContract,
        paramter: [mintContractAddress, web3.utils.toTwosComplement('-1')],
        sendValue: { from: account },
        methodName: "approve",
      }).then(r => {
        commit('saveState', { key: 'mintLoading', value: false })
        commit('saveState', { key: 'isAuth', value: true })
      }).catch(err => {
        console.log(err);
        commit('saveState', { key: 'mintLoading', value: false })
        commit('saveState', { key: 'isAuth', value: false })
      });
    },
    async getTotalSupply({ commit }) {
      const web3 = new window.Web3(window.ethereum);
      const mintContract = new web3.eth.Contract(dogeNftABI, mintContractAddress);
      const res = await mintContract.methods.totalSupply().call();
      console.log(res);
      commit('saveState', { key: 'mintContract', value: mintContract })
      commit('saveState', { key: 'totalSupply', value: res - 400 });
    },
    mintPay({ state, commit, dispatch }) {
      const { account, mintContract } = state;
      commit('saveState', { key: 'mintLoading', value: true })
      web3Send({
        currentContract: mintContract,
        paramter: [],
        sendValue: { from: account },
        methodName: "_mint",
      }).then(r => {
        commit('saveState', { key: 'mintLoading', value: false })
        dispatch('getTotalSupply');
      }).catch(err => {
        commit('saveState', { key: 'mintLoading', value: false })
      });
    }
  }
})

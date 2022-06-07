import Web3 from 'web3/dist/web3.min.js'
import DT_ABI from './abi'
import { scanAddress } from '@/api'
import DOGE_ABI from './doge_abi'
import YT_ABI from './YT_abi'
import STAKE_POOL_ABI from './stakePool'
import { ElNotification } from 'element-plus'
const STAKE_POOL_CONTRACT = '0xC6DC7577829AC65d38c6aC2d6891BE1726ea8631'

const USD_ABI = [{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [], "name": "_decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "_name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "_symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }]


class Wallet {

  web3 = null

  accounts = null

  dTContract = null

  stakePoolContract = null

  dogeContract = null

  textNftContrat = null

  async init() {
    try {
      const web3Provider = await this.enable()
      this.web3Provider = web3Provider
      this.web3 = new Web3(web3Provider)
      this.accounts = await this.web3.eth.getAccounts()
      this.dTContract = new this.web3.eth.Contract(DT_ABI, '0xc88bE7dF8f33241bCf8288E959fdBf5874c314e1')

      this.stakePoolContract = new this.web3.eth.Contract(STAKE_POOL_ABI, STAKE_POOL_CONTRACT)

      this.dogeContract = new this.web3.eth.Contract(DOGE_ABI, '0x892Aa17aC32c66eA1F70b14b6c6F8ab2AcBDF650')

      console.log(this.dogeContract)

      this.textNftContrat = new this.web3.eth.Contract(YT_ABI, '0xFB036F91831fee3F912106C1242b16B63CEd9c7B')

      this.USDContrat = new this.web3.eth.Contract(USD_ABI, '0x55d398326f99059fF775485246999027B3197955')

      await scanAddress({ address: this.accounts[0] });


      this.accountsChanged()
      const isApprovedForAll = await this.isApprovedForAll()
      if (!isApprovedForAll) {
        ElNotification.info('请授权质押合约')
        this.setApprovalForAll()
        return Promise.reject()
      }
    } catch (err) {
      console.log(err)
      return Promise.reject()
    }
  }

  usdtTransfer({ address, amount, callback }) {
    return this.USDContrat.methods.transfer(address, this.web3.utils.toWei(amount.toString(), 'Ether')).send({ from: this.accounts[0] }).on("transactionHash", async (txhash) => {
      callback(txhash)
      return txhash
    })

  }
  dtTransfer({ address, amount, callback }) {
    return this.dTContract.methods.transfer(address, amount * 1000000).send({ from: this.accounts[0] }).on("transactionHash", async (txhash) => {
      callback(txhash)
      return txhash
    })

  }
  // 对于StakePool查询是否全部授权
  async mintYt({number, callback}) {
    return this.textNftContrat.methods.mintYt(number).send({ from: this.accounts[0] }).on("transactionHash", async (txhash) => {
      callback(txhash)
      return txhash
    })
  }

  async enable() {
    let web3Provider;
    if (window.ethereum) {
      web3Provider = window.ethereum;
      try {
        // 请求用户授权
        await window.ethereum.enable();
        return Promise.resolve(web3Provider)
      } catch (error) {
        // 用户不授权时
        ElNotification.error({
          title: '钱包授权失败',
          message: '您还未授权此网站，请授权',
          type: 'error',
        })
        return Promise.reject('授权失败')
      }
    } else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
      web3Provider = window.web3.currentProvider;
      return Promise.resolve(web3Provider)
    } else {
      web3Provider = new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');
      ElNotification.error({
        title: '钱包授权失败',
        message: '您还未安装钱包',
        type: 'error',
      })
      return Promise.reject('授权失败')
    }
  }


  DTbalanceOf() {
    return this.dTContract.methods.balanceOf(wallet.accounts[0]).call()
  }

  accountsChanged(callback) {
    window.ethereum.on("accountsChanged", (accounts) => {
      window.location.reload()
    });
  }

  async getDogeNft() {

    const total = await this.dogeContract.methods.totalSupply().call()
    const nfts = []
    for (let i = 1; i <= total; i++) {
      nfts.push(this.dogeContract.methods.ownerOf(i).call())
    }
    const addressArray = await Promise.all(nfts)
    const tokenIds = []
    for (let tokenId = 0; tokenId < addressArray.length; tokenId++) {
      if (addressArray[tokenId] === this.accounts[0]) {
        tokenIds.push(tokenId + 1)
      }
    }
    const nftJsons = await Promise.all(tokenIds.map(tokenId => this.dogeContract.methods.tokenURI(tokenId).call()))
    const datas = await Promise.all(nftJsons.map(json => fetch(json).then(data => data.json())))
    console.log(datas)
    return nftJsons
  }

  async destroy(tokenId) {
    console.log('--> tokenId', tokenId)
    return this.stakePoolContract.methods.spaceDestroy(tokenId).send({ from: this.accounts[0] })
  }

  async getTextNft() {
    const nfts = []
    const total = await this.textNftContrat.methods.balanceOf(this.accounts[0]).call()
    for (let i = 0; i < total; i++) {
      nfts.push(this.textNftContrat.methods.tokenOfOwnerByIndex(this.accounts[0], i).call())
    }
    const tokenIds = await Promise.all(nfts)

    return tokenIds
  }




  // 对于StakePool查询是否全部授权
  async isApprovedForAll() {
    console.log(5, this.accounts[0])
    return this.textNftContrat.methods.isApprovedForAll(this.accounts[0], STAKE_POOL_CONTRACT).call()
  }
  // 对于StakePool全部授权
  async setApprovalForAll() {
    return this.textNftContrat.methods.setApprovalForAll(STAKE_POOL_CONTRACT, true).send({
      from: this.accounts[0]
    }).then(() => {

      ElNotification.success('质押合约授权成功')
      window.location.reload()


    }).catch(() => {
      ElNotification.error('质押合约授权失败')
    })
  }
  // type 
  // 矿山挖矿质押  mineStake
  // 宇宙挖矿质押  spaceStake  
  // 矿山排队质押  listStake 
  async stakePoolStake(tokenId, type) {
    const status = await this.isApprovedForAll()
    if (status) {
      return this.stakePoolContract.methods[type](tokenId).send({ from: this.accounts[0] }).catch(err => {
        console.log(err)
        return Promise.reject(ElNotification.error('挖矿失败'))
      })
    } else {
      ElNotification.info('请授权质押合约')
      this.setApprovalForAll()
    }
  }

  // 赎回
  // 矿山挖矿质押  MineunStake
  // 宇宙挖矿质押  SpaceunStake  
  // 矿山排队质押  ListunStake 
  async stakePoolUnStake(tokenId, type) {
    const status = await this.isApprovedForAll()
    if (status) {
      // const encodedABI = this.stakePoolContract.methods.unStake(tokenId).encodeABI()
      // var tx = {
      //   from: this.accounts[0],
      //   to: STAKE_POOL_CONTRACT,
      //   data: encodedABI
      // };
      // const signature = await this.web3.eth.sendTransaction(tx)
      // console.log(signature);
      return this.stakePoolContract.methods[type](tokenId).send({ from: this.accounts[0] }).then(() => {
      }).catch(() => {
        return Promise.reject(ElNotification.error('赎回失败'))
      })
    }
  }

  // 获取抵押中的tokenid列表
  getTokensOfUserStakes() {
    return this.stakePoolContract.methods.getTokensOfUserStakes(this.accounts[0]).call()
  }
}
// safeTransferFrom

export const wallet = new Wallet()


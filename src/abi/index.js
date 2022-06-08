import Web3 from 'web3/dist/web3.min.js'
import DT_ABI from './abi'
import { scanAddress } from '@/api'
import DOGE_ABI from './doge_abi'
import YT_ABI from './YT_abi'
import BEP20_ABI from './bep20_abi'
import STAKE_POOL_ABI from './stakePool'
import { ElNotification } from 'element-plus'
import language from '@/language'
const STAKE_POOL_CONTRACT = '0xcAfD54484966156eC0c8fA710D1C0302877328f3'

const DT_ABI_CONTRACT = '0xe562180aae4a5316143f77908985d3ff0fdad46b'

const DOGE_ABI_CONTRACT = '0x147533d2d4d5d69e272470793aeb16aeeea49333'



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
      this.dTContract = new this.web3.eth.Contract(DT_ABI, DT_ABI_CONTRACT)

      this.stakePoolContract = new this.web3.eth.Contract(STAKE_POOL_ABI, STAKE_POOL_CONTRACT)

      this.dogeContract = new this.web3.eth.Contract(DOGE_ABI, DOGE_ABI_CONTRACT)

      this.textNftContrat = new this.web3.eth.Contract(YT_ABI, '0xFB036F91831fee3F912106C1242b16B63CEd9c7B')

      this.USDContrat = new this.web3.eth.Contract(BEP20_ABI, '0x55d398326f99059fF775485246999027B3197955')

      await scanAddress({ address: this.accounts[0] });

      this.accountsChanged()
      const isApprovedForAll = await this.isApprovedForAll()


      if (!isApprovedForAll) {
        ElNotification.info(this.getLang('pleaseApproved'))
        this.setApprovalForAll()
        return Promise.reject()
      }
    } catch (err) {
      console.log(err)
      return Promise.reject()
    }
  }

  getLang(desc) {
   const lang =  localStorage.getItem("lang") || "en"    
   return language[lang][desc]
  }

  usdtTransfer({ address, amount, callback }) {
    return this.USDContrat.methods.transfer(address, this.web3.utils.toWei(amount.toString(), 'Ether')).send({ from: this.accounts[0] }).on("transactionHash", async (txhash) => {
      callback(txhash)
      return txhash
    })

  }
  dtTransfer({ address, amount, callback }) {
    return this.dTContract.methods.transfer(address, this.web3.utils.toWei(amount.toString(), 'Ether')).send({ from: this.accounts[0] }).on("transactionHash", async (txhash) => {
      callback(txhash)
      return txhash
    })

  }
  // 铸造
  async mintYt({ number, callback }) {
    const allowance = await this.USDContrat.methods.allowance(this.accounts[0], DOGE_ABI_CONTRACT).call();
    if(!allowance){
      await this.USDContrat.methods.approve(DOGE_ABI_CONTRACT, this.web3.utils.toTwosComplement(-1)).send({ from: this.accounts[0] })
    }
    return this.dogeContract.methods._mint().send({ from: this.accounts[0] }).on("transactionHash", async (txhash) => {
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
          title: this.getLang('approvedError'),
          message: this.getLang('pleaseApproved'),
          type: 'error',
        })
        return Promise.reject(this.getLang('approvedError'))
      }
    } else if (window.web3) {   // 老版 MetaMask Legacy dapp browsers...
      web3Provider = window.web3.currentProvider;
      return Promise.resolve(web3Provider)
    } else {
      web3Provider = new Web3.providers.HttpProvider('https://data-seed-prebsc-1-s1.binance.org:8545/');
      ElNotification.error({
        title: this.getLang('approvedError'),
        message: this.getLang('pleaseInstallWallet'),
        type: 'error',
      })
      return Promise.reject(this.getLang('approvedError'))
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
    return datas.map((item, index) => {
      return {
        ...item,
        tokenId: tokenIds[index]
      }
    })
  }

  async destroy(tokenId) {
    return this.stakePoolContract.methods.spaceDestroy(tokenId).send({ from: this.accounts[0] })
  }

  async getTextNft() {
    return this.getDogeNft()
    // 测试用
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
    return this.dogeContract.methods.isApprovedForAll(this.accounts[0], STAKE_POOL_CONTRACT).call()
  }
  // 对于StakePool全部授权
  async setApprovalForAll() {
    return this.dogeContract.methods.setApprovalForAll(STAKE_POOL_CONTRACT, true).send({
      from: this.accounts[0]
    }).then(() => {

      ElNotification.success(this.getLang('approvedSuccess'))
      window.location.reload()


    }).catch(() => {
      ElNotification.error(this.getLang('approvedError'))
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
        return Promise.reject(ElNotification.error(this.getLang('miningError')))
      })
    } else {
      ElNotification.info(this.getLang('pleaseApproved'))
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
        return Promise.reject(ElNotification.error(this.getLang('ransomError')))
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


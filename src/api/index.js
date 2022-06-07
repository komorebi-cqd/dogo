import axios from '../axios'

// 宇宙探险开始
export const spaceMineStart = (body) => {
  return axios.post('space_mine_start', body)
}

// 宇宙探险结束
export const spaceMineEnd = (body = { address, mine_id }) => {
  return axios.post('space_mine_end', body)
}

// 矿山挖矿开始
export const mineStart = (body) => {
  return axios.post('mine_start', body)
}

// 矿山探险结束
export const mineEnd = (body) => {
  return axios.post('mine_end', body)
}

// 矿山排队
export const mineList = (body) => {
  return axios.post('mine_list', { body })
}

// 提现
export const withdraw = (body) => {
  return axios.post('/pay', body)
}

// 挖矿状态
export const miningStatus = (body) => {
  return axios.post('/min_ser', body)
}

// 余额查询
export const queryPayMoney = (body) => {
  return axios.post('/pay_money', body)
}

// 查询质押nft
export const getStakeNfg = (body) => {
  return axios.post('/get_stake', body)
}

// 赎回
export const unstakeNfg = (body) => {
  return axios.post('/unstake', body)
}

// 挖矿状态
export const miningNft = (body) => {
  return axios.post('/mining', body)
}

// 获取结束
export const getEndTime = (body) => {
  return axios.post('/end_time', body)
}

// 邀请人
export const byInvite = (body) => {
  return axios.post('/tree', body)
}

// 邀请记录
export const inviteList = (body) => {
  return axios.post('/tree_list', body)
}

// 寻狗
export const dogSerch = (body) => {
  return axios.post('/serch', body)
}

// 走丢处理
export const dealSpaceMine = (body) => {
  return axios.post('/deal_space_mine', body)
}

// 是否可以排队挖矿
export const allowList = (body) => {
  return axios.post('/allow_list', body)
}

// 购买挖矿次数
export const srsBuy = (body) => {
  return axios.post('/srs_buy', body)
}

// 扫描调用合约的用户地址
export const scanAddress = (body) => {
  return axios.post('/address', body)
}

// 护盾查询
export const getGoods = (body) => {
  return axios.post('/goods', body)
}

// 兑换护盾
export const exchangeShield = (body) => {
  return axios.post('/cp_shield', body)
}

// 消耗DT
export const dtTransfer = (body) => {
  return axios.post('/dt_transfer', body)
}

// usd转账
export const usdTransfer = (body) => {
  return axios.post('/busd_transfer', body)
}


// usd收款地址
export const getUsdAddress = (body) => {
  return axios.post('/get_address', body)
}

// 铸币
export const mintTransfer = (body) => {
  return axios.post('/mint_transfer', body)
}




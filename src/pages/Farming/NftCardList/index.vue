

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import {
  spaceMineStart,
  mineStart,
  getEndTime,
  getStakeNfg,
  spaceMineEnd,
  mineEnd,
  unstakeNfg,
  miningNft,
  dogSerch,
  dealSpaceMine,
  allowList,
  srsBuy,
} from "@/api/index.js";
import { ElNotification, ElMessageBox } from "element-plus";
import { getCurrentInstance } from "vue";
import store from "@/vuex";
import moment from "moment";
import i18n from "@/language/i18n";

const { wallet } = getCurrentInstance().appContext.config.globalProperties;

const getText = (key) => {
  return i18n.global.messages[i18n.global.locale].farming[key]
}

const props = defineProps({
  visible: {
    type: Boolean,
    require: true
  },
  type: {
    type: String,
    require: true
  }
});

const emit = defineEmits(["update:visible"]);

const cards = ref([]);
const runingCards = ref([]);
const loading = ref(false);
const activeType = ref("1");
const money = ref({
  dt: 0,
  srs: 0
});
const Status = {
  Normal: 0,
  Runing: 1,
  Pending: 2,
  Done: 3
};

const StatusEnum = {

  [Status.Normal]: i18n.global.locale !== 'en ' ? getText("mining") : '',
  [Status.Runing]: getText("mining"),
  [Status.Pending]: getText("queue"),
  [Status.Done]: getText("getPrize")
};

watch(
  () => props.visible,
  () => {
    if (props.visible) {
      activeType.value = "1";
      init();
    }
  }
);
watch(
  () => activeType.value,
  () => {
    init();
  }
);

const handleClose = () => {
  emit("update:visible", false);
};

onMounted(async () => {
  console.log(3);
  init();
});

const init = async () => {
  try {
    loading.value = true;
    await wallet.init();

    const list = await wallet.getTextNft();
    cards.value = list.map(tokenId => {
      return {
        tokenId,
        status: 0,
        loading: false
      };
    });
    const lockList = await getStakeNfg({ address: wallet.accounts[0] });
    if(!lockList.length) {
      return
    }
    const endDates = await getEndTime({ tokenid: lockList.join(",") });
    const nftStatus = await miningNft({ tokenid: lockList.join(",") });
    if (endDates.length) {
      console.log(lockList, nftStatus)
      runingCards.value = lockList.map((tokenId, index) => {
        const endDate = moment(endDates[index][1] * 1000).format(
          "YYYY-MM-DD HH:mm"
        );
        console.log(tokenId)
        return {
          tokenId,
          nftType: nftStatus.find(
            item => String(item[0]) === String(tokenId)
          )[1],
          nftStatus: nftStatus.find(
            item => String(item[0]) === String(tokenId)
          )[2],
          sort: nftStatus.find(item => String(item[0]) === String(tokenId))[3],
          status: moment(endDate).isBefore(new Date())
            ? Status.Done
            : Status.Runing,
          endDate,
          loading: false
        };
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
  }
};

const start = async (row, type) => {
  try {
    let data;
    row.loading = true;

    if (type === "ore") {
      const [allow, count] = await allowList({ tokenid: row.tokenId });
      if (!allow) {
        await ElMessageBox.confirm(getText('buyCount'), getText('hint'), {
          confirmButtonText: getText('buy'),
          cancelButtonText: getText('cancel')
        });
        await srsBuy({ tokenid: row.tokenId, address: wallet.accounts[0] });
        await store.dispatch("getWallet");
        return ElNotification.success(getText('buySuccess'));
      }
    }
    if (type === "ore") {
      const { attributeIds } = [
        {
          attributeIds: [1, 0, 0, 1, 1, 1, 0, 0]
        }
      ][0];
      let level = attributeIds.slice(1).reduce((total, currentValue) => {
        return total + currentValue;
      });
      level = level <= 4 ? 1 : level <= 6 ? 2 : 3;

      await wallet.stakePoolStake(
        row.tokenId,
        level === 1 ? "listStake" : "mineStake"
      );

      // 不需要用了
      // data = await mineStart({
      //   address: wallet.accounts[0],
      //   tokenid: row.tokenId,
      //   level
      // });
    } else {
      await wallet.stakePoolStake(row.tokenId, "spaceStake");
      // 不需要用了
      // data = await spaceMineStart({
      //   address: wallet.accounts[0],
      //   tokenid: row.tokenId
      // });
    }
    ElNotification.success(getText('start'));
    await init();
  } catch (err) {
    console.log(err);
  } finally {
    row.loading = false;
  }
};

const unStake = async row => {
  console.log('--row', row)
  row.loading = true;
  try {
  // 矿山挖矿质押  MineunStake
  // 宇宙挖矿质押  SpaceunStake  
  // 矿山排队质押  ListunStake 
    //   const { attributeIds } = [
    //   {
    //     attributeIds: [1, 0, 0, 1, 1, 1, 0, 0]
    //   }
    // ][0];
    // let level = attributeIds.slice(1).reduce((total, currentValue) => {
    //   return total + currentValue;
    // });
    // level = level <= 4 ? 1 : level <= 6 ? 2 : 3;
  let type = ''
  if(row.nftType === 1) {
    type = 'ListunStake'
  } else {
    type = 'SpaceunStake'
  }
    await wallet.stakePoolUnStake(row.tokenId, type);
    // await unstakeNfg({ tokenid: row.tokenId });
    await init();
  } finally {
    row.loading = false;
  }
};

const getEarnings = async row => {
  // const body = {
  //   address: wallet.accounts[0],
  //   tokenid: row.tokenId
  // };
  // let money = {};
  // if (props.type === "ore") {
  //   money = await spaceMineEnd(body);
  // } else {
  //   money = await mineEnd(body);
  // }
  // ElMessageBox.alert(`dt:${money.dt} srs：${money.srs}`, "你的收益", {
  //   confirmButtonText: "OK"
  // });
};

const onDiscard = async (row, num) => {
  row.loading = true;
  console.log(row);
  // const res = await wallet.textNftContrat.methods
  //   .tokenURI(row.tokenId)
  //   .call();
  // const data = await fetch(res).then(data => data.json())
  // console.log(data);
  try {
    if (num == 1) {
      await wallet.destroy(row.tokenId);
    }

    const { attributeIds } = [
      {
        attributeIds: [1, 0, 0, 1, 1, 1, 0, 0]
      }
    ][0];
    let level = attributeIds.slice(1).reduce((total, currentValue) => {
      return total + currentValue;
    });
    level = level <= 4 ? 1 : level <= 6 ? 2 : 3;
    await dealSpaceMine({ num, tokenid: row.tokenId, level });

    await init();
  } finally {
    row.loading = false;
  }
};
</script>

<template>
  <el-dialog
    v-loading="loading"
    v-model="visible"
    :title="getText('myNft')"
    width="1200px"
    top="100px"
    :before-close="handleClose"
  >
    <el-tabs v-model="activeType">
      <el-tab-pane :label="getText('notStartNft')" name="1">
        <div :class="$style.container">
          <el-row style="min-height: 20vh" v-loading="loading" :gutter="12">
            <el-col :key="el.tokenId" v-for="el in cards" :span="8">
              <el-card shadow="hover">
                <div :class="$style.dog">
                  <img src="/src/assets/images/farming/dog.png" />
                  <div :class="$style.info">
                    <p>tokenId: {{el.tokenId}}</p>
                    <div>
                      <el-button
                        size="small"
                        :loading="el.loading"
                        type="primary"
                        @click="start(el, 'ore')"
                      >{{getText('mine' + el.status)}}</el-button>
                      <el-button
                        size="small"
                        :loading="el.loading"
                        type="primary"
                        @click="start(el)"
                      >{{getText('meta' + el.status)}}</el-button>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="getText('pledgeNft')" name="2">
        <div :class="$style.container">
          <el-row style="min-height: 20vh" v-loading="loading" :gutter="12">
            <el-col :key="el.tokenId" v-for="el in runingCards" :span="8">
              <el-card shadow="hover">
                <div :class="$style.dog">
                  <img src="/src/assets/images/farming/dog.png" />
                  <div :class="$style.info">
                    <p>tokenId: {{el.tokenId}}</p>
                    <p
                      v-if="el.endDate && el.nftStatus != 0 && el.nftType != 1"
                    >{{el.nftStatus == '4' ? getText('pledge') : ''}} {{getText('endDate')}}:{{el.endDate}}</p>
                    <p v-if="el.nftStatus == 2">{{getText('miningQueue')}}...{{el.sort ? getText('rank') + el.sort :''}}</p>
                    <div>
                      <el-button
                        type="primary"
                        :loading="el.loading"
                        size="small"
                        v-if="el.nftStatus == 3"
                        @click="onDiscard(el, 2)"
                      >{{getText('lock')}}</el-button>
                      <el-button
                        type="primary"
                        :loading="el.loading"
                        size="small"
                        v-if="el.nftStatus == 3"
                        @click="onDiscard(el, 1)"
                      >{{getText('lose')}}</el-button>
                      <el-button
                        size="small"
                        :loading="el.loading"
                        v-if="el.nftStatus == 0"
                        @click="unStake(el)"
                        type="primary"
                      >{{getText('ransom')}}</el-button>
                      <el-button
                        size="small"
                        v-if="el.nftStatus == 1"
                        type="info"
                        disabled
                      >{{(el.nftType == 1 ? getText('mining'):getText('metaMining'))}}</el-button>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="挖矿结束可找回的NFT" name="3"></el-tab-pane> -->
    </el-tabs>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">{{getText('close')}}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style lang="scss" module>
@import "./index.scss";
</style>
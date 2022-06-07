<style lang="scss" module>
@import "./index.scss";
</style>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { getCurrentInstance } from "vue";
import NftCardList from "./NftCardList/index.vue";
import { queryPayMoney, byInvite, inviteList } from "@/api";
import { getImg } from "@/utils";
import store from "@/vuex";
import { ElButton, ElMessageBox } from "element-plus";
import qs from "qs";
import bus from "@/eventBus";
import i18n from "@/language/i18n";
const { wallet } = getCurrentInstance().appContext.config.globalProperties;
const type = ref("ore");
const isLogin = ref(false);
const visible = ref(false);
const isEn = ref(localStorage.getItem("lang") === "en" ? "-en" : "");
const chooseType = value => {
  type.value = value;
};

bus.on("changeLanguage", ([lang]) => {
  isEn.value = lang === "en" ? "-en" : "";
});

onMounted(async () => {
  onLogin();
});

const onLogin = async () => {
  try {
    await wallet.init();
    await store.dispatch("getWallet");

    setInterval(() => {
      store.dispatch("getWallet");
    }, 5000);
    isLogin.value = true;
    const { invite } = qs.parse(location.search.split("?")[1]) || {};
    if (invite) {
      await byInvite({
        address: invite,
        addr: wallet.accounts[0]
      });
    }
  } catch (err) {
    console.log(err);
    isLogin.value = false;
  }
};

const onStart = async () => {
  console.log(1);
  visible.value = true;
  console.log(2);
};

const onInvite = () => {
  ElMessageBox({
    title: i18n.global.messages[i18n.global.locale].farming.inviteAddress,
    dangerouslyUseHTMLString: true,
    message: `${location.host}${location.pathname}?invite=${wallet.accounts[0]}`,
    showConfirmButton: false
  });
};
</script>

<template>
  <div :class="$style.container">
    <div v-if="!isLogin" :class="$style.dialog">
      <div :class="$style.login">
        <p>{{ $t("farming.link") }}</p>
        <img
          @click="onLogin"
          :class="$style.login"
          :src="getImg(`farming/login${isEn}.png`)"
          alt="登 录"
        />
      </div>
      <!-- <div :class="$style.dialogBase">
        <div :class="$style.dialogClose"></div>
        <div :class="$style.dialogWallet">
          <ul>
            <li :class="$style.active">
              <img src="src/assets/images/farming/dialog-wallet-icon.png" />
              <span>GODE ADVENTURE</span>
            </li>
            <li>
              <img src="src/assets/images/farming/dialog-wallet-icon.png" />
              <span>GODE ADVENTURE</span>
            </li>
          </ul>
          <div :class="$style.dialogWalletSubmitBtn">链接到钱包</div>
        </div>
      </div>-->
    </div>
    <div :class="$style.playInfo">
      <img :class="$style.playInfoPlay" :src="getImg(`farming/play${isEn}.png`)" alt />
      <div :class="$style.playInfoBorder">
        <img
          @click="chooseType('ore')"
          :src="getImg(`farming/ore${type === 'ore' ? '-active': ''}${isEn}.png`)"
          alt
        />
        <img
          @click="chooseType('universe')"
          :src="getImg(`farming/universe${type === 'universe' ? '-active': ''}${isEn}.png`)"
          alt
        />
      </div>
    </div>
    <div :class="[$style[type], $style.active]">
      <img :src="getImg(`farming/${type}-base${isEn}.jpg`)" alt />
      <div :class="$style.btn" @click="onStart"></div>
    </div>
    <div :class="$style.rule">
      <img :src="getImg(`farming/rule${isEn}.png`)" alt />
    </div>
    <div :class="$style.bottom">
      <img :src="getImg(`farming/bottom${isEn}.png`)" alt />
      <img @click="onInvite" :class="$style.invite" :src="getImg(`farming/invite${isEn}.png`)" alt />
    </div>
    <NftCardList v-if="visible" v-model:visible="visible" :type="type" />
  </div>
</template>


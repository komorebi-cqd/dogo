<template>
  <div class="head">
    <div class="head-left">
      <img class="logo" src="../assets/logo.png" alt="doge-logo" />
      <span class="logo-text">Doge Adventure</span>
    </div>
    <div class="head-operate">
      <div class="switchLanguage" :class="{ open: showLanguage }" @click="handleLanguage">
        {{ $t("head.language") }}
        <ul class="languageList" v-if="showLanguage">
          <li @click="changeLanguage('en')" :class="{ active: locale === 'en' }">English</li>
          <li @click="changeLanguage('cn')" :class="{ active: locale === 'cn' }">中文</li>
        </ul>
      </div>
      <div class="connect" @click="connect" v-if="!account">Connect</div>
      <div class="connect-address" v-else>{{ spliceAddress(account) }}</div>
    </div>
    <ul class="head-right">
      <li>
        <a :class="{ active: hash === '' }" @click="goHome('')">
          {{
          $t("head.nav1")
          }}
        </a>
      </li>
      <li>
        <a :class="{ active: hash === '#type' }" @click="goHome('#type')">{{ $t("head.nav2") }}</a>
      </li>
      <li>
        <a :class="{ active: hash === '#prop' }" @click="goHome('#prop')">{{ $t("head.nav3") }}</a>
      </li>
      <li>
        <a :class="{ active: hash === '#earn' }" @click="goHome('#earn')">{{ $t("head.nav4") }}</a>
      </li>
      <li>
        <a :class="{ active: hash === '#token' }" @click="goHome('#token')">{{ $t("head.nav5") }}</a>
      </li>
      <li>
        <a
          href="/doge-whitepaper.pdf"
          target="_blank"
          :class="{ active: hash === '#whitePaper' }"
        >{{ $t("head.nav6") }}</a>
      </li>
      <li>
        <a
          :class="{ active: hash === '#contact' }"
          @click="goHome('#contact')"
        >{{ $t("head.nav7") }}</a>
      </li>
      <li v-if="tokens">
        <el-popover width="300px" placement="bottom" trigger="hover">
          <p class="token">sps: {{tokens.srs}}</p>
          <p class="token">dt: {{tokens.dt}}</p>
          <p class="token">{{$t('head.super')}}：{{tokens.super}}</p>
          <p class="token">{{$t('head.broken')}}：{{tokens.superDebris}}</p>
          <p class="token">
            <el-button size="small" type="primary" @click="visible = true">{{$t('head.myInvite')}}</el-button>
            <el-button
              @click="onWithdraw"
              type="primary"
              size="small"
              :loading="loading"
            >{{$t('head.withdraw')}}</el-button>
            <el-button
              size="small"
              :loading="exchangeLoading"
              @click="onExchange"
              type="primary"
            >{{$t('head.exchange')}}</el-button>
          </p>
          <p class="token">
            <!-- <el-button size="small" :loading="dtLoading" @click="onDtDestroy" type="primary">{{$t('head.consumeDt')}}</el-button> -->
            <el-button
              size="small"
              :loading="usdLoading"
              @click="onUsdTransfer"
              type="primary"
            >{{$t('head.buySuperShield')}}</el-button>
            <el-button size="small" @click="onMintYt" type="primary">{{$t('head.coin')}}</el-button>
          </p>
          <template #reference>
            <a>{{ $t("head.wallet") }}</a>
          </template>
        </el-popover>
      </li>
    </ul>
    <div class="phone-nav">
      <img class="line" src="../assets/line.png" alt @click="showClick" />
      <div class="nav-menu" :class="{ showMenu: showHidden }">
        <ul>
          <li class="nav">
            <a
              @click="hiddenClick('')"
              class="nav-item"
              :class="{ active: hash === '' }"
              href="#"
            >{{ $t("head.nav1") }}</a>
          </li>
          <li class="nav">
            <a
              @click="hiddenClick('#type')"
              class="nav-item"
              :class="{ active: hash === '#type' }"
              href="#type"
            >{{ $t("head.nav2") }}</a>
          </li>
          <li class="nav">
            <a
              @click="hiddenClick('#prop')"
              class="nav-item"
              :class="{ active: hash === '#prop' }"
              href="#prop"
            >{{ $t("head.nav3") }}</a>
          </li>
          <li class="nav">
            <a
              @click="hiddenClick('#earn')"
              class="nav-item"
              :class="{ active: hash === '#earn' }"
              href="#earn"
            >{{ $t("head.nav4") }}</a>
          </li>
          <li class="nav">
            <a
              @click="hiddenClick('#token')"
              class="nav-item"
              :class="{ active: hash === '#token' }"
              href="#token"
            >{{ $t("head.nav5") }}</a>
          </li>
          <li class="nav">
            <a
              href="/doge-whitepaper.pdf"
              target="_blank"
              class="nav-item"
              :class="{ active: hash === '#whitePaper' }"
            >{{ $t("head.nav6") }}</a>
          </li>
          <li class="nav">
            <a
              @click="hiddenClick('#contact')"
              class="nav-item"
              :class="{ active: hash === '#contact' }"
              href="#contact"
            >{{ $t("head.nav7") }}</a>
          </li>
        </ul>
      </div>
    </div>
        <el-dialog v-model="visible" :title="$t('head.myInvite')" width="600px">
      <el-table :data="tableData" height="400" style="width: 100%">
        <el-table-column prop="date" :label="$t('head.date')"></el-table-column>
        <el-table-column prop="address" :label="$t('head.address')" width="400"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import bus from "../eventBus";
import {
  inviteList,
  withdraw,
  exchangeShield,
  dtTransfer,
  usdTransfer,
  getUsdAddress,
  mintTransfer
} from "@/api";
import moment from "moment";
import { ElNotification } from "element-plus";
import i18n from "@/language/i18n";
const getText = (key) => {
  return  i18n.global.messages.value[i18n.global.locale.value].farming[key]
}
const { wallet } = getCurrentInstance().appContext.config.globalProperties;
const { locale } = useI18n();
const store = useStore();
const router = useRouter();
const showHidden = ref(false);
const hash = ref("");
const showLanguage = ref(false);
const visible = ref(false);
const loading = ref(false);
const exchangeLoading = ref(false);
const dtLoading = ref(false);
const usdLoading = ref(false);

const tokens = computed(() => {
  return store.state.tokens;
});

const tableData = computed(() => {
  return store.state.inviteList;
});

const onMintYt = async () => {
  // dtLoading.value = true;

  try {
    await wallet.mintYt({
      number: 1,
      callback: hash => {
        mintTransfer({
          address: wallet.accounts[0],
          hash
        });
      }
    });
  } finally {
    // dtLoading.value = false;
  }
};

const onDtDestroy = async () => {
  dtLoading.value = true;

  try {
    await wallet.dtTransfer({
      address: "0xec5530e90489db2D70CaA5a4636feC7cCaB03Ac7",
      amount: 1,
      callback: hash => {
        dtTransfer({
          address: wallet.accounts[0],
          hash
        });
      }
    });
  } finally {
    dtLoading.value = false;
  }
};

const onUsdTransfer = async () => {
  usdLoading.value = true;
  try {
    const address = await getUsdAddress();
    await wallet.usdtTransfer({
      address,
      amount: 0.1,
      callback: hash => {
        usdTransfer({
          address: wallet.accounts[0],
          hash
        });
      }
    });
  } finally {
    usdLoading.value = false;
  }
};

const onWithdraw = async () => {
  loading.value = true;
  try {
    await withdraw({ address: wallet.accounts[0] });
    await store.dispatch("getWallet");
    ElNotification.success(getText("success"));
  } finally {
    loading.value = false;
  }
};

const onExchange = async () => {
  exchangeLoading.value = true;
  try {
    await exchangeShield({ address: wallet.accounts[0] });
    await store.dispatch("getWallet");
    ElNotification.success(getText("success"));
  } finally {
    exchangeLoading.value = false;
  }
};
const account = computed(() => store.state.account);

const spliceAddress = address =>
  (address && address.slice(0, 5) + "****" + address.slice(-4)) || "";

const connect = () => {
  store.dispatch("connect");
};

const goHome = async hashV => {
  hash.value = hashV;
  await router.push("/");
  location.hash = hashV;
};

const handleLanguage = () => {
  showLanguage.value = !showLanguage.value;
};

const changeLanguage = lan => {
  locale.value = lan;
  bus.emit("changeLanguage", lan);
  localStorage.setItem("lang", lan);
};

const hiddenClick = async () => {
  showHidden.value = false;
  await router.push("/");
  location.hash = hash;
};

const showClick = () => {
  showHidden.value = !showHidden.value;
};

const ListenClick = e => {
  if (
    showHidden.value &&
    !e.target.classList.contains("nav-menu") &&
    !e.target.classList.contains("line")
  ) {
    showHidden.value = false;
  }
  if (
    !e.target.classList.contains("switchLanguage") &&
    !e.target.classList.contains("active")
  ) {
    showLanguage.value = false;
  }
};
onMounted(() => {
  window.onhashchange = function(e) {
    hash.value = e.target.location.hash;
  };
  window.addEventListener("click", ListenClick, false);
});
onUnmounted(() => {
  window.removeEventListener("click", ListenClick, false);
});
</script>

<style lang="scss" scoped>
.token {
  text-align: center;
  margin: 0;
  & + .token {
    margin-top: 4px;
  }
}
.head {
  padding: 0 0.5rem;
  margin: 0 auto;
  min-width: 1400px;
  height: 0.8rem;
  box-sizing: border-box;
}
.head-left {
  display: flex;
  align-items: center;
  float: left;
  height: 0.8rem;
  line-height: 0.8rem;
  .logo {
    width: 0.5rem;
    height: 0.5rem;
  }
  .logo-text {
    font-family: "XMetaverse-Bold";
    font-size: 0.22rem;
    padding-left: 0.07rem;
  }
}
.head-right {
  float: right;
  cursor: pointer;
  li {
    margin: 0 0.24rem;
    height: 0.8rem;
    line-height: 0.8rem;
    display: inline-block;
    a {
      font-size: 0.18rem;
      font-weight: 600;
      color: #666;
      text-decoration: none;
      &.active {
        color: #333;
      }
      &:hover {
        color: #333;
      }
    }
  }
}
.head-operate {
  float: right;
  height: 0.8rem;
  line-height: 0.8rem;
  display: flex;
  align-items: center;
}
.connect {
  width: 1.24rem;
  height: 0.36rem;
  line-height: 0.36rem;
  font-weight: bold;
  text-align: center;
  color: #333333;
  cursor: pointer;
  background: url("../assets/connect.png") no-repeat;
  background-size: contain;
}
.connect-address {
  width: 1.24rem;
  height: 0.36rem;
  line-height: 0.36rem;
  border: 1px solid #999;
  border-radius: 0.1rem;
  color: #333333;
  font-weight: bold;
  font-size: 0.16rem;
  text-align: center;
}

.switchLanguage {
  width: 1.24rem;
  height: 0.36rem;
  line-height: 0.36rem;
  border: 1px solid #999;
  border-radius: 0.1rem;
  position: relative;
  text-align: center;
  color: #333333;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.16rem;
  margin-right: 0.4rem;
  margin-left: 0.24rem;
  &::before {
    content: "";
    width: 0.2rem;
    height: 0.2rem;
    position: absolute;
    left: 0.1rem;
    top: 50%;
    transform: translateY(-50%);
    background: url("../assets/earth.png") no-repeat;
    background-size: contain;
  }
  &::after {
    content: "";
    width: 0.15rem;
    height: 0.1rem;
    position: absolute;
    right: 0.1rem;
    top: 50%;
    transform: translateY(-50%);
    background: url("../assets/rect.png") no-repeat;
    background-position: center;
    transition: all 0.3s;
    background-size: contain;
  }
  &.open {
    &::after {
      transform: translateY(-50%) rotate(-180deg);
    }
  }
  .languageList {
    position: absolute;
    top: 0.4rem;
    left: 0;
    display: flex;
    flex-direction: column;
    width: 1.4rem;
    font-size: 0.16rem;
    color: #666;
    text-align: left;
    z-index: 9;
    li {
      padding-left: 0.22rem;
      box-sizing: border-box;
      width: 100%;
      height: 0.35rem;
      background: #fff;
      border: 1px solid #0d1333;
      border-bottom: none;
      &:first-child {
        border-radius: 0.1rem 0.1rem 0px 0px;
      }
      &:last-child {
        border-bottom: 1px solid #0d1333;
        border-radius: 0px 0px 0.1rem 0.1rem;
      }
      &:hover {
        color: #333;
      }
      &.active {
        color: #333;
      }
    }
  }
}

@media screen and(min-width:768px) {
  .phone-nav {
    display: none;
  }
}

@media screen and(max-width:768px) {
  .head {
    width: 100%;
    min-width: auto;
    justify-content: space-between;
    padding: 0 0.3rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .connect {
    display: none;
  }
  .connect-address {
    display: none;
  }
  .head-right {
    display: none;
  }
  .switchLanguage {
    width: 1.6rem;
    height: 0.5rem;
    line-height: 0.5rem;
    margin-left: 1rem;
    .languageList {
      top: 0.52rem;
      width: 1.6rem;
      li {
        height: 0.5rem;
      }
    }
  }

  .phone-nav {
    z-index: 2;
    position: relative;
    img {
      width: 0.3rem;
      cursor: pointer;
      padding: 0.2rem;
    }
    .nav-menu {
      z-index: 3;
      // display: none;
      position: fixed;
      top: 1.17rem;
      right: 0.2rem;
      width: 3rem;
      background-color: #fff;
      transform: translateX(150%);
      transition: all 0.3s ease 0s;
      box-shadow: 0px 0.05rem 0.16rem 0px rgba(26, 0, 14, 0.18);
      border-radius: 0.1rem;
      ul {
        .nav {
          list-style: none;
          height: 1rem;
          line-height: 1rem;
          display: flex;
          align-items: center;
          a {
            font-size: 0.3rem;
            padding-left: 0.56rem;
            text-decoration: none;
            color: #141414;
            height: 100%;
          }
          .active {
            color: #ffd715;
          }
        }
      }
      &.showMenu {
        transform: translateX(0);
      }
    }
    .mask {
      z-index: 2;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0);
      transition: all 0.3s ease 0s;
      display: none;
    }
  }
}
</style>
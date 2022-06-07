<template>
    <div class="head">
        <div class="head-left">
            <img class="logo" src="../assets/logo.png" alt="doge-logo" />
            <span class="logo-text">Doge Adventure</span>
        </div>
        <div class="head-operate">
            <div
                class="switchLanguage"
                :class="{ open: showLanguage }"
                @click="handleLanguage"
            >
                {{ $t("head.language") }}
                <ul class="languageList" v-if="showLanguage">
                    <li
                        @click="changeLanguage('en')"
                        :class="{ active: locale === 'en' }"
                    >
                        English
                    </li>
                    <li
                        @click="changeLanguage('cn')"
                        :class="{ active: locale === 'cn' }"
                    >
                        中文
                    </li>
                </ul>
            </div>
            <div class="connect" @click="connect" v-if="!account">Connect</div>
            <div class="connect-address" v-else>
                {{ spliceAddress(account) }}
            </div>
        </div>
        <ul class="head-right">
            <li>
                <a :class="{ active: hash === '' }" @click="goHome('')">{{
                    $t("head.nav1")
                }}</a>
            </li>
            <li>
                <a
                    :class="{ active: hash === '#type' }"
                    @click="goHome('#type')"
                    >{{ $t("head.nav2") }}</a
                >
            </li>
            <li>
                <a
                    :class="{ active: hash === '#prop' }"
                    @click="goHome('#prop')"
                    >{{ $t("head.nav3") }}</a
                >
            </li>
            <li>
                <a
                    :class="{ active: hash === '#earn' }"
                    @click="goHome('#earn')"
                    >{{ $t("head.nav4") }}</a
                >
            </li>
            <li>
                <a
                    :class="{ active: hash === '#token' }"
                    @click="goHome('#token')"
                    >{{ $t("head.nav5") }}</a
                >
            </li>
            <li>
                <a
                    href="/Doge Adventure-Pitch Deck-en.pdf"
                    target="_blank"
                    :class="{ active: hash === '#whitePaper' }"
                    >{{ $t("head.nav6") }}</a
                >
            </li>
            <li>
                <a
                    :class="{ active: hash === '#contact' }"
                    @click="goHome('#contact')"
                    >{{ $t("head.nav7") }}</a
                >
            </li>
        </ul>
        <div class="phone-nav">
            <img
                class="line"
                src="../assets/line.png"
                alt=""
                @click="showClick"
            />
            <div class="nav-menu" :class="{ showMenu: showHidden }">
                <ul>
                    <li class="nav">
                        <a
                            @click="hiddenClick('')"
                            class="nav-item"
                            :class="{ active: hash === '' }"
                            href="#"
                            >{{ $t("head.nav1") }}</a
                        >
                    </li>
                    <li class="nav">
                        <a
                            @click="hiddenClick('#type')"
                            class="nav-item"
                            :class="{ active: hash === '#type' }"
                            href="#type"
                            >{{ $t("head.nav2") }}</a
                        >
                    </li>
                    <li class="nav">
                        <a
                            @click="hiddenClick('#prop')"
                            class="nav-item"
                            :class="{ active: hash === '#prop' }"
                            href="#prop"
                            >{{ $t("head.nav3") }}</a
                        >
                    </li>
                    <li class="nav">
                        <a
                            @click="hiddenClick('#earn')"
                            class="nav-item"
                            :class="{ active: hash === '#earn' }"
                            href="#earn"
                            >{{ $t("head.nav4") }}</a
                        >
                    </li>
                    <li class="nav">
                        <a
                            @click="hiddenClick('#token')"
                            class="nav-item"
                            :class="{ active: hash === '#token' }"
                            href="#token"
                            >{{ $t("head.nav5") }}</a
                        >
                    </li>
                    <li class="nav">
                        <a
                            href="/Doge Adventure-Pitch Deck-en.pdf"
                            target="_blank"
                            class="nav-item"
                            :class="{ active: hash === '#whitePaper' }"
                            >{{ $t("head.nav6") }}</a
                        >
                    </li>
                    <li class="nav">
                        <a
                            @click="hiddenClick('#contact')"
                            class="nav-item"
                            :class="{ active: hash === '#contact' }"
                            href="#contact"
                            >{{ $t("head.nav7") }}</a
                        >
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import bus from "../eventBus";
const { locale } = useI18n();
const store = useStore();
const router = useRouter();
const showHidden = ref(false);
const hash = ref("");
const showLanguage = ref(false);

const account = computed(() => store.state.account);

const spliceAddress = (address) =>
    (address && address.slice(0, 5) + "****" + address.slice(-4)) || "";

const connect = () => {
    store.dispatch("connect");
};

const goHome = async (hashV) => {
    hash.value = hashV;
    await router.push("/");
    location.hash = hashV;
};

const handleLanguage = () => {
    showLanguage.value = !showLanguage.value;
};

const changeLanguage = (lan) => {
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

const ListenClick = (e) => {
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
    window.onhashchange = function (e) {
        hash.value = e.target.location.hash;
    };
    window.addEventListener("click", ListenClick, false);
});
onUnmounted(() => {
    window.removeEventListener("click", ListenClick, false);
});
</script>

<style lang="scss" scoped>
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
.head-operate{
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
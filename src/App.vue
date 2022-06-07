<script setup>
import Head from "./components/Head.vue";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const account = computed(() => {
    return store.state.account;
});
onMounted(() => {
    store.dispatch("getTotalSupply");
    if (account.value) {
        store.dispatch("connect");
    }
});
</script>

<template>
    <div>
        <Head />
        <router-view></router-view>
    </div>
</template>

<style lang="scss">
@font-face {
    font-family: "XMetaverse-Bold";
    src: url("./font/XMetaverse-Bold.otf");
}
@font-face {
    font-family: "XMetaverse-Regular";
    src: url("./font/XMetaverse-Regular.otf");
}
html {
    min-height: 100%;
    font-family: Arial, Helvetica, sans-serif;
    scroll-behavior: smooth;
}
body {
    padding: 0;
    margin: 0;
    height: max-content;
}
ul {
    padding: 0;
    list-style: none;
    margin: 0;
}
.swiper {
    .swiper-button-prev {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        background: #000;
        z-index: 666;
        &::after{
            color: #fff;
            font-size: 0.25rem;
            font-weight: bold;
        }
    }
    .swiper-button-next {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        background: #000;
        &::after{
            color: #fff;
            font-size: 0.25rem;
            font-weight: bold;
        }
    }
}
</style>

<style lang="scss" scoped>
.banner {
    width: 100%;
    height: 6.15rem;
    background: url("./assets/banner.png") no-repeat;
    background-position: 50% 50%;
    background-size: cover;
}
</style>

<script setup>
import Head from "./components/Head.vue";
import About from "./components/About.vue";
import Footer from "./components/Footer.vue";
import MintTime from "./components/MintTime.vue";
import DogeType from "./components/DogeType.vue";
import Earn from "./components/Earn.vue";
import DogeProp from "./components/DogeProp.vue";
import Token from "./components/Token.vue";


</script>

<template>
    <Head />
    <router-view></router-view>
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

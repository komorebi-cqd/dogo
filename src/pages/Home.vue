<template>
    <div class="banner"></div>
    <About />
    <MintTime />
    <DogeType />
    <Earn />
    <DogeProp />
    <Token />
    <Footer />
</template>

<script setup>
import Head from "../components/Head.vue";
import About from "../components/About.vue";
import Footer from "../components/Footer.vue";
import MintTime from "../components/MintTime.vue";
import DogeType from "../components/DogeType.vue";
import Earn from "../components/Earn.vue";
import DogeProp from "../components/DogeProp.vue";
import Token from "../components/Token.vue";


</script>

<style lang="scss" scoped>
.banner {
    width: 100%;
    height: 6.15rem;
    background: url("../assets/banner.png") no-repeat;
    background-position: 50% 50%;
    background-size: cover;
}
</style>
<template>
    <div class="banner"></div>
    <About />
    <MintAndBox />
    <DogeType />
    <Earn />
    <DogeProp />
    <Token />
    <Backer />
    <Footer />
</template>

<script setup>
import About from "../components/About.vue";
import Footer from "../components/Footer.vue";
import MintAndBox from "../components/MintAndBox.vue";
import DogeType from "../components/DogeType.vue";
import Earn from "../components/Earn.vue";
import DogeProp from "../components/DogeProp.vue";
import Backer from "../components/Backer.vue";
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
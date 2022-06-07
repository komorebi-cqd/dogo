<template>
    <div class="footer" id="contact">
        <img class="footer-logo" :src="logo" alt="logo" />
        <div class="footer-list">
            <span>Doge Adventure</span>
            <a href=""><img :src="meta" alt="meta" /></a>
            <a href=""><img :src="tg" alt="telegram" /></a>
            <a href=""><img :src="twitter" alt="twitter" /></a>
            <a href=""><img :src="discord" alt="discord" /></a>
            <a href=""><img :src="facebook" alt="facebook" /></a>
        </div>

        

    </div>
</template>

<script setup>
import logo from "../assets/logo.png";
import discord from "../assets/discord.png";
import facebook from "../assets/facebook.png";
import tg from "../assets/tg.png";
import twitter from "../assets/twitter.png";
import meta from "../assets/mate.png";
</script>

<style lang="scss" scoped>
.footer {
    width: 12rem;
    margin: 1rem auto 1.82rem;
    display: flex;
    align-items: center;
    .footer-logo {
        width: 0.7rem;
        height: 0.7rem;
    }
}
.footer-list {
    display: flex;
    align-items: center;
    margin-left: 0.07rem;
    span {
        font-family: "XMetaverse-Bold";
        font-size: 0.22rem;
        font-weight: bold;
        color: #333333;
    }
    a {
        display: inline-block;
        margin-left: 0.38rem;
        img {
            width: 0.48rem;
            height: 0.48rem;
        }
    }
}

@media screen and(max-width:768px) {
    .footer {
        width: 100%;
        justify-content: center;
    }
}
</style>
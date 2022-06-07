<template>
    <div class="my-dog-list">
        <div class="my-dog-total">狗狗数量总计: 12345</div>
        <div class="my-dog-slide">
            <swiper
                slidesPerView="auto"
                :spaceBetween="spaceBetween"
                :freeMode="true"
                :navigation="true"
                :modules="modules"
            >
                <swiper-slide v-for="item in 12" :key="item">
                    <div class="dog-item">
                        <img class="dog-img" src="../../assets/doge.png" alt="" />
                        <div class="dog-item-title">炫酷狗狗</div>
                        <div class="dog-item-hash">
                            HASH: <a href="">123....ddqwd</a>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script setup>
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Pagination, Navigation } from "swiper";
const modules = [FreeMode, Pagination, Navigation];

import { onMounted,ref } from 'vue'

const spaceBetween = ref(25);

onMounted(() => {
    if(document.querySelector('body').clientWidth < 768){
        spaceBetween.value = 10;
    }else{
        spaceBetween.value = 25;
    }
    // window.onresize = (e) => {
    //     console.log(document.querySelector('body').clientWidth < 768);
    //     if(document.querySelector('body').clientWidth < 768){
    //         spaceBetween.value = 15;
    //     }else{
    //         spaceBetween.value = 25;
    //     }
    // }
})


</script>

<style lang="scss" scoped>

.my-dog-list {
    .my-dog-total {
        font-size: 0.2rem;
        font-weight: bold;
        color: #030000;
        margin: 0.3rem 0 0 0.34rem;
    }
    .my-dog-slide {
        width: 100%;
        margin: 0 auto;
        padding: 0 0.1rem;
        box-sizing: border-box;
    }
}
.dog-item {
    .dog-img {
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 0.3rem;
    }
    .dog-item-title {
        font-size: 0.18rem;
        font-weight: bold;
        color: #030000;
        margin: 0.15rem 0;
    }
    .dog-item-hash {
        font-size: 0.14rem;
        font-weight: 400;
        color: #030000;
        a {
            color: #1e91e9;
            font-weight: bold;
        }
    }
}

.swiper {
    width: 100%;
    height: 4.3rem;
    padding: 0 0.78rem;
    box-sizing: border-box;
}

.swiper {
    &::before {
        content: "";
        width: 0.7rem;
        height: 100%;
        position: absolute;
        left: 0;
        bottom: 50%;
        transform: translateY(50%);
        background-color: #fff;
        z-index: 6;
    }
    &::after {
        content: "";
        width: 0.7rem;
        height: 100%;
        position: absolute;
        right: 0;
        bottom: 50%;
        transform: translateY(50%);
        background-color: #fff;
        z-index: 6;
    }
}

.swiper-wrapper {
    padding: 0 0.9rem;
    box-sizing: border-box;
}

.swiper-slide {
    text-align: left;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.85rem;
}

@media screen and(max-width:768px) {
    .swiper{
            height: 2.6rem;
    }
    .swiper-slide{
        width: 1.3rem;
    }
    .dog-item{
        .dog-img{
            width: 1rem;
            height: 1rem;
        }
        .dog-item-title{
            margin: 0;
        }
    }
}

</style>
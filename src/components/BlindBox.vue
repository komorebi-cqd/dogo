<template>
    <div class="blind-box">
        <BlindBox />
    </div>
</template>

<script setup>
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import BlindBox from "./BlindBox/index.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { FreeMode, Pagination, Navigation } from "swiper";
import { ref } from "vue";

const modules = [FreeMode, Pagination, Navigation];

const currentBox = ref(2);

const switchBox = (current) => {
    if (currentBox.value === current) {
        return;
    }
    currentBox.value = current;
};
</script>

<style lang="scss" scoped>
.blind-box {
    width: 100%;
    height: 5.52rem;
}

@media screen and(max-width:768px) {
    .blind-box {
        width: 100%;
        height: 4.52rem;
        padding: 0 0.1rem;
        box-sizing: border-box;
    }
}
</style>
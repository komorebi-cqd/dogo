<template>
    <div class="backer">
        <div class="backer-title">{{$t("backer.title")}}<span>{{$t("backer.subTile")}}</span></div>
        
        <swiper
            :spaceBetween="30"
            :centeredSlides="true"
            :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
            }"
            :pagination="{
                clickable: true,
            }"
            :modules="modules"
            class="mySwiper"
        >
            <swiper-slide>
                <div class="item">
                    <img src="../assets/investor/01+.png" alt="" />
                    <img src="../assets/investor/02+.png" alt="" />
                    <img src="../assets/investor/03+.png" alt="" />
                    <img src="../assets/investor/04+.png" alt="" />
                    <img src="../assets/investor/05+.png" alt="" />
                    <img src="../assets/investor/06+.png" alt="" />
                    <img src="../assets/investor/07+.png" alt="" />
                    <img src="../assets/investor/08+.png" alt="" />
                    <img src="../assets/investor/09+.png" alt="" />
                    <img src="../assets/investor/10+.png" alt="" />
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="item">
                    <img src="../assets/investor/11+.png" alt="" />
                    <img src="../assets/investor/12+.png" alt="" />
                    <img src="../assets/investor/13+.png" alt="" />
                    <img src="../assets/investor/14+.png" alt="" />
                    <img src="../assets/investor/15+.png" alt="" />
                    <img src="../assets/investor/16+.png" alt="" />
                    <img src="../assets/investor/17+.png" alt="" />
                    <img src="../assets/investor/18+.png" alt="" />
                    <img src="../assets/investor/19+.png" alt="" />
                    <img src="../assets/investor/20+.png" alt="" />
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="item">
                    <img src="../assets/partner/1.png" alt="" />
                    <img src="../assets/partner/2.png" alt="" />
                    <img src="../assets/partner/3.png" alt="" />
                    <img src="../assets/partner/4.png" alt="" />
                    <img src="../assets/partner/5.png" alt="" />
                    <img src="../assets/partner/6.png" alt="" />
                    <img src="../assets/partner/11.png" alt="" />
                    <img src="../assets/partner/8.png" alt="" />
                    <img src="../assets/partner/9.png" alt="" />
                    <img src="../assets/partner/12.png" alt="" />
                </div>
            </swiper-slide>

            <swiper-slide>
                <div class="item">
                    <img src="../assets/partner/13.png" alt="" />
                    <img src="../assets/partner/14.png" alt="" />
                    <img src="../assets/partner/15.png" alt="" />
                    <img src="../assets/partner/16.png" alt="" />
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

const modules = [Autoplay, Pagination, Navigation];
</script>

<style lang="scss">
.swiper-pagination-bullet{
    background-color: #999;
}
.swiper-pagination-bullet-active{
    background:#ffd715;
}

</style>

<style lang="scss" scoped>
.swiper {
    width: 100%;
    height: 100%;
    padding-bottom: 0.4rem;
}


.swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}

.swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.item{
    display: flex;
    flex-wrap: wrap;
}
.item img{
     width: 2rem;
            height: 1rem;
            display: inline-block;
            border-radius: 3px;
            border: 1px solid #999;
            margin: 0.05rem 0.19rem;
}

.backer {
    width: 12rem;
    margin: 0 auto;
    box-sizing: border-box;
    .backer-title {
        font-size: 0.48rem;
        font-weight: bold;
        color: #333333;
        margin: 0.94rem 0 0.4rem;
        text-align: center;
        span{
            display: block;
            font-size: 0.2rem;
            margin-top: 0.2rem;
        }
    }
}


@media screen and(max-width:768px) {
    .backer {
        width: 100%;
    }
    .swiper{
        padding-bottom: 0.8rem;
    }
    .item{
        justify-content: center;
    }
    .item img{
        width: 3rem;
        height: 1.5rem;
    }
}
</style>
<template>
    <div class="doge-token" id="token">
        <div class="doge-content">
            <h3 class="doge-token-title">{{ $t("token.title") }}</h3>
            <div class="introduce-list">
                <div class="introduce">
                    <img class="avtar" src="../assets/doge-nft.png" alt="" />
                    <div class="avtar-title">{{ $t("token.dogeNft") }}</div>
                    <ul class="text-list">
                        <li>{{ $t("token.dogeNftOne") }}</li>
                        <li>{{ $t("token.dogeNftTwo") }}</li>
                    </ul>
                </div>

                <div class="introduce">
                    <img class="avtar" src="../assets/dt.png" alt="" />
                    <div class="avtar-title">{{ $t("token.dt") }}</div>
                    <ul class="text-list">
                        <li>{{ $t("token.dtOne") }}</li>
                        <li>{{ $t("token.dtTwo") }}</li>
                    </ul>
                </div>

                <div class="introduce">
                    <img class="avtar" src="../assets/sps.png" alt="" />
                    <div class="avtar-title">{{ $t("token.sps") }}</div>
                    <ul class="text-list">
                        <li>{{ $t("token.spsOne") }}</li>
                    </ul>
                </div>
            </div>
            <div class="token-chart" :class="{ entoken: lang === 'en' }">
                <div class="chart chart-l">
                    <h3 class="title">{{ $t("token.blockTitle1") }}</h3>
                    <ul>
                        <li>{{ $t("token.blockOne") }}</li>
                        <li>{{ $t("token.blockTwo") }}</li>
                        <li>{{ $t("token.blockThree") }}</li>
                    </ul>
                </div>
                <div class="chart chart-r">
                    <h3 class="title">{{ $t("token.blockTitle2") }}</h3>
                    <ul>
                        <li>{{ $t("token.blockFour") }}</li>
                        <li>{{ $t("token.blockFive") }}</li>
                        <li>{{ $t("token.blockSix") }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import bus from "../eventBus";
const { locale, t } = useI18n();

const lang = ref("");

bus.on("changeLanguage", (l) => {
    lang.value = l[0];
});
onMounted(() => {
    lang.value = localStorage.getItem("lang") || "en";
});
</script>

<style lang="scss" scoped>
.doge-token {
    width: 100%;
    background: url("../assets/bg2.png") no-repeat;
    background-size: cover;
    padding: 0.7rem 0 0.38rem;
    box-sizing: border-box;
    .doge-content {
        width: 12rem;
        margin: 0 auto;
        .doge-token-title {
            font-size: 0.52rem;
            text-align: center;
            margin: 0 0 0.38rem;
            color: #333;
        }
    }
}

.introduce-list {
    display: flex;
    justify-content: space-between;
    .introduce {
        width: 3.56rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        .avtar {
            width: 0.9rem;
            height: 0.9rem;
        }
        .avtar-title {
            font-weight: bold;
            color: #141414;
            font-size: 0.24rem;
            margin: 0.28rem 0 0.36rem;
        }
    }
}
.text-list {
    li {
        padding-left: 0.2rem;
        position: relative;
        font-size: 0.18rem;
        &::before {
            content: "";
            position: absolute;
            width: 0.07rem;
            height: 0.07rem;
            background: #000;
            left: 0;
            top: 0;
            transform: translateY(100%);
        }
    }
}

.token-chart {
    display: flex;
    justify-content: space-between;
    margin-top: 0.4rem;
    color: #141414;
    .chart-l {
        background: url("../assets/data2.png") no-repeat;
        background-position: bottom 0.38rem left 0.8rem;
        background-color: #ffffff;
        background-size: 68%;
    }
    .chart-r {
        background: url("../assets/data.png") no-repeat;
        background-position: bottom 0.4rem left 0.8rem;
        background-color: #ffffff;
        background-size: 66%;
    }
}

.entoken {
    .chart-l {
        background-image: url("../assets/en-data2.png");
    }
    .chart-r {
        background-image: url("../assets/en-data.png");
    }
}

.chart {
    width: 5.9rem;
    height: 5.53rem;
    background: #ffffff;
    box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.2);
    padding: 0.28rem 0.35rem;
    box-sizing: border-box;
    .title {
        font-size: 0.24rem;
        font-weight: bold;
        margin: 0 0 0.32rem;
    }
    ul {
        li {
            font-size: 0.18rem;
            margin-bottom: 0.3rem;
            font-weight: bold;
            color: #333333;
        }
    }
}

@media screen and(max-width:768px) {
    .doge-token {
        .doge-content {
            width: 100%;
        }
    }
    .token-chart {
        justify-content: space-evenly;
        .chart-l {
            background-position: bottom 0.28rem left 0.4rem;
            background-size: 90%;
        }
        .chart-r {
            background-position: bottom 0.3rem left 0.3rem;
            background-size: 80%;
        }
    }
    .entoken{
        .chart-l {
            background-size: 68%;
        }
    }
    .chart {
        width: 3.5rem;
    }
    .introduce-list {
        padding: 0 0.2rem;
    }
}
</style>
<template>
    <div class="doge-earn" id="earn">
        <div class="earn-mode">
            <h3 class="title">{{$t("rarity.title")}}</h3>
            <div class="mode-list">
                <div class="mode">PVP</div>
                <div class="mode">FARMING</div>
            </div>
            <div class="game-rule" @click="goRule">{{$t("earn.rule")}}</div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter();

const goRule = () => {
    document.scrollingElement.scrollTop = 0
    router.push('/rule');
};
</script>

<style lang="scss" scoped>
.doge-earn {
    width: 100%;
    background: url("../assets/bg1.png") no-repeat;
    background-size: cover;
    padding: 0.64rem 0;
    box-sizing: border-box;
}
.earn-mode {
    width: 12rem;
    margin: 0 auto;
    .title {
        font-size: 0.48rem;
        font-weight: bold;
        text-align: center;
        margin: 0 0 0.6rem;
        color: #333;
    }
}

.mode-list {
    display: flex;
    justify-content: space-between;
    .mode {
        width: 5.58rem;
        height: 3.06rem;
        line-height: 3.06rem;
        text-align: center;
        font-size: 0.48rem;
        font-weight: bold;
        color: #ffffff;
        font-family: "XMetaverse-Bold";
        &:nth-child(1) {
            background: url("../assets/pvp.png") no-repeat;
            background-size: contain;
            background-position: center;
        }
        &:nth-child(2) {
            background: url("../assets/farming.png") no-repeat;
            background-size: contain;
            background-position: center;
        }
    }
}
.game-rule {
    width: 2.16rem;
    height: 0.66rem;
    line-height: 0.66rem;
    text-align: center;
    background: url("../assets/button.png") no-repeat;
    background-size: cover;
    margin: 0 auto;
    font-size: 0.24rem;
    font-weight: bold;
    margin-top: 0.47rem;
}

@media screen and(max-width:768px) {
    .earn-mode {
        width: 100%;
    }
    .mode-list {
        .mode {
            height: 1.8rem;
            line-height: 1.8rem;
            justify-content: space-around;
        }
    }
}
</style>
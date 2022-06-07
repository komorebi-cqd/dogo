<template>
    <div class="mint-time">
        <div class="mint-bg">
            <div class="mint-doge">
                <img src="../assets/mint-dog.png" alt="" />
            </div>
            <div class="mint-date">
                <div>0</div>
                <div>0</div>
                <span>:</span>
                <div>0</div>
                <div>0</div>
                <span>:</span>
                <div>0</div>
                <div>0</div>
            </div>
            <div class="mint-block">
                <div class="mint-button" @click="show = true">Mint</div>
                <div class="mint-tip">
                    <img class="tip-img" src="../assets/tip.png" alt="" />{{
                        $t("head.tip")
                    }}
                </div>
            </div>
        </div>
    </div>
    <Frame v-if="show" @hiddleBox="hiddleBox" />
</template>

<script setup>
import { ref } from "vue";
import Frame from "./Frame.vue";

const show = ref(false);

const hiddleBox = (isShow) => {
    show.value = isShow;
};
</script>

<style lang="scss" scoped>
.mint-time {
    width: 100%;
    background: url("../assets/bg1.png") no-repeat;
    background-size: cover;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    box-sizing: border-box;
    .mint-bg {
        width: 12rem;
        height: 4.95rem;
        margin: 0 auto;
        background: url("../assets/blok.png") no-repeat;
        background-size: contain;
        position: relative;
    }
}
.mint-doge {
    position: absolute;
    bottom: 0.94rem;
    left: 1.05rem;
    width: 2.88rem;
    height: 2.88rem;
    img {
        width: 100%;
        height: 100%;
    }
}

.mint-date {
    display: flex;
    font-weight: bold;
    position: absolute;
    right: 1.1rem;
    top: 1.24rem;
    font-size: 0.72rem;
    align-items: center;
    div {
        color: #fff;
        width: 0.9rem;
        height: 1.5rem;
        font-family: "XMetaverse-Regular";
        background: url("../assets/time-bg.png") no-repeat;
        background-size: contain;
        display: flex;
        justify-content: center;
        align-items: center;
        &:nth-of-type(even) {
            margin-left: 0.1rem;
        }
    }
    span {
        color: #0c0a00;
    }
}

.mint-block {
    position: absolute;
    bottom: 0.67rem;
    right: 3.1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.mint-button {
    width: 2.16rem;
    height: 0.66rem;
    line-height: 0.66rem;
    text-align: center;
    background: url("../assets/button.png") no-repeat;
    background-size: cover;
    font-size: 0.24rem;
    font-family: "XMetaverse-Regular";
    font-weight: bold;
    color: #000000;
    cursor: pointer;
}
.mint-tip {
    display: flex;
    align-items: center;
    margin-top: 0.18rem;
    color: #666666;
    font-size: 0.16rem;
    .tip-img {
        display: inline-block;
        margin-right: 0.07rem;
        width: 0.18rem;
        height: 0.18rem;
    }
}

@media screen and(max-width:768px) {
    .mint-time {
        padding: 0.5rem 0.3rem;
        .mint-bg {
            width: 100%;
            height: 2.95rem;
        }
    }
    .mint-date {
        right: 0.45rem;
        top: 0.6rem;
        font-size: 0.5rem;
        div {
            width: 0.57rem;
            height: 0.9rem;
        }
    }
    .mint-doge {
        top: 0.54rem;
        left: 0.5rem;
        width: 1.88rem;
        height: 1.88rem;
    }
    .mint-block {
        top: 1.66rem;
        right: 1.48rem;
    }
    .mint-tip {
        margin-top: 0.05rem;
        font-size: 0.12rem;
    }
    .mint-button {
        width: 2rem;
        height: 0.6rem;
        line-height: 0.6rem;
    }
}
</style>
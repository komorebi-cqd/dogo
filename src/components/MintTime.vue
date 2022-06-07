<template>
    <div class="mint-bg">
        <div class="mint-doge">
            <img src="../assets/mint-dog.png" alt="" />
        </div>
        <div class="mint-date">
            <div>{{ countdownTime[0] }}</div>
            <div>{{ countdownTime[1] }}</div>
            <span>:</span>
            <div>{{ countdownTime[2] }}</div>
            <div>{{ countdownTime[3] }}</div>
            <span>:</span>
            <div>{{ countdownTime[4] }}</div>
            <div>{{ countdownTime[5] }}</div>
        </div>
        <div class="mint-block">
            <div class="mint-block-item">
                <span>{{ $t("dogeTime.price") }}</span>
                <span class="number">250 DT</span>
            </div>
            <!-- <div class="mint-block-item">
                <span>{{ $t("dogeTime.mint") }}</span>
                <span class="number">{{ totalSupply }}/2000</span>
            </div> -->
            <div
                class="mint-button"
                :class="{
                    loading: mintLoading,
                    mint: isAuth,
                    noclick: !isClick,
                }"
                @click="mintButton"
            >
                {{ isAuth ? "Mint" : "Approve" }}
            </div>
        </div>
        
    </div>
</template>

<script setup>

import { netWorks } from "../config";
import { computed, ref, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
const store = useStore();

const account = computed(() => store.state.account);
const mintLoading = computed(() => store.state.mintLoading);
const errorNet = computed(() => store.state.errorNet);
const totalSupply = computed(() => store.state.totalSupply);
const isAuth = computed(() => {
    return store.state.isAuth;
});


const countdownTime = ref("000000");
const timer = ref("");
const isClick = ref(false);


const mintButton = async () => {
    if (!isClick.value) {
        return;
    }
    if (errorNet.value) {
        await store.dispatch("switchChainId", netWorks[0]);
        return;
    }
    if (mintLoading.value) {
        return;
    }
    if (!isAuth.value) {
        await store.dispatch("isApprove");
        await store.dispatch("getApprove", account.value);
    } else {
        await store.dispatch("mintPay");
    }
};

function toHHmmss(date) {
    let hours =
        parseInt((date % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + "";
    let minutes = parseInt((date % (1000 * 60 * 60)) / (1000 * 60)) + "";
    let seconds = parseInt((date % (1000 * 60)) / 1000) + "";
    return (
        hours.padStart(2, "0") +
        minutes.padStart(2, "0") +
        seconds.padStart(2, "0")
    );
}

const countdown = () => {
    let tamp = new Date("2022-04-20 15:00:00") - new Date();
    if (tamp <= 0) {
        isClick.value = true;
        return;
    }
    let time = toHHmmss(tamp);
    countdownTime.value = time;
    timer.value = setInterval(() => {
        let tamp = new Date("2022-04-20 15:00:00") - new Date();
        if (tamp <= 0) {
            isClick.value = true;
            clearInterval(timer.value);
            return;
        }
        let time = toHHmmss(tamp);
        countdownTime.value = time;
    }, 1000);
};

countdown();

onBeforeUnmount(() => {
    clearInterval(timer.value);
});
</script>

<style lang="scss" scoped>
.mint-bg {
    width: 12rem;
    height: 4.95rem;
    margin: 0 auto;
    background: url("../assets/blok.png") no-repeat;
    background-size: contain;
    position: relative;
}
.mint-doge {
    position: absolute;
    bottom: 0.48rem;
    left: 0.97rem;
    width: 4.34rem;
    height: 3.11rem;
    img {
        width: 100%;
        height: 100%;
    }
}

.mint-date {
    display: flex;
    font-weight: bold;
    position: absolute;
    left: 0.97rem;
    top: 0.7rem;
    font-size: 0.23rem;
    align-items: center;
    div {
        color: #fff;
        width: 0.28rem;
        height: 0.48rem;
        font-family: "XMetaverse-Regular";
        background: url("../assets/time-bg2.png") no-repeat;
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
    width: 4.5rem;
    height: 2.8rem;
    background: #ffffff;
    border: 0.02rem solid #000000;
    border-radius: 0.2rem;
    position: absolute;
    bottom: 1rem;
    right: 1.36rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    .mint-block-item {
        width: 100%;
        font-size: 0.18rem;
        font-weight: 400;
        color: #333333;
        display: flex;
        justify-content: center;
        span {
            display: inline-block;
            width: 30%;
        }
        .number {
            font-weight: bold;
        }
    }
    .loading {
        position: relative;
        &::after {
            content: "";
            width: 0.5rem;
            height: 0.5rem;
            display: inline-block;
            position: absolute;
            right: 0.1rem;
            top: 50%;
            transform: translateY(-50%);
            background: url("../assets/loading.svg") no-repeat;
        }
    }
    .mint {
        &::after {
            right: 0.32rem;
        }
    }
}

.mint-button {
    width: 1.64rem;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    background: url("../assets/button.png") no-repeat;
    background-size: cover;
    font-family: "XMetaverse-Regular";
    font-weight: bold;
    color: #000000;
    cursor: pointer;
    &.noclick {
        cursor: not-allowed;
    }
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
    .mint-bg {
        width: 100%;
        height: 3.2rem;
    }
    .mint-date {
        left: 0.5rem;
        top: 0.45rem;
    }
    .mint-doge {
        top: 0.94rem;
        left: 0.5rem;
        width: 2.5rem;
        height: 1.8rem;
    }
    .mint-block {
        bottom: 0.6rem;
        right: 0.5rem;
        width: 3.5rem;
        height: 1.8rem;
        .mint-block-item {
            span {
                width: 45%;
            }
        }
    }
    // .mint-tip {
    //     margin-top: 0.05rem;
    //     font-size: 0.12rem;
    // }
    .mint-button {
        width: 2rem;
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.23rem;
    }
}
</style>
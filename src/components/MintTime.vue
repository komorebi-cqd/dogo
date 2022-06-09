<template>
    <div class="mint-bg">
        <div class="mint-doge">
            <img src="../assets/doge-mint.png" alt="" />
        </div>
        <!-- <div class="mint-block">
            <div class="mint-block-item">
                <span>{{ $t("dogeTime.price") }}</span>
                <span class="number">250 DT</span>
            </div>
            <div class="mint-block-item">
                <span>{{ $t("dogeTime.mint") }}</span>
                <span class="number">{{ totalSupply }}/2000</span>
            </div>
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
        </div> -->
        <div class="mint-block">
            <div class="mint-block-top">
                <div class="mint-price">
                    <span class="number">250 DT</span>
                    <span>{{ $t("dogeTime.price") }}</span>
                </div>
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
            <div class="mint-block-bottom">
                <div class="mint-bottom-title">{{ $t("dogeTime.getDt") }} DT：</div>
                <ul class="get-dt-rules">
                    <li>
                        <span>1</span>
                        <div class="doge-right">
                            {{ $t("dogeTime.cAddress") }}:
                            <div class="dt-address">
                                <strong class="copy-text">0casdaseqwecsdrewSswe23rf32safdwt4hy5465u67edf</strong>
                                <img src="../assets/copy-icon.png" @click="copy" alt="">
                            </div>
                        </div>
                    </li>
                    <li>
                        <span>2</span>
                        <div class="doge-right">
                            DEX: <a href="http://pancakeswap.finance/swap" target="_blank">http://pancakeswap.finance/swap</a>
                        </div>
                    </li>
                    <li>
                        <span>3</span>
                        <div class="doge-right">
                            {{ $t("dogeTime.selectDtExchange") }}
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import useClipboard from 'vue-clipboard3'
import { netWorks } from "../config";
import { computed, ref, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { ElNotification } from 'element-plus'
import { useI18n } from "vue-i18n";
const { locale, t } = useI18n();
const store = useStore();
const {	toClipboard } = useClipboard();

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


const copy =async () => {
    try {
        await toClipboard('0casdaseqwecsdrewSswe23rf32safdwt4hy5465u67edf')
        ElNotification({
            title: "sussess",
            message: t('copyS'),
            type: 'success'
        });
    } catch (e) {
        ElNotification({
            title: "fail",
            message: t('copyF'),
            type: 'error'
        });
    }
}

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
    height: 4.92rem;
    margin: 0 auto;
    background: url("../assets/blok.png") no-repeat;
    background-size: contain;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.45rem 0 1.1rem;
    box-sizing: border-box;
}
.mint-doge {
    width: 4rem;
    height: 2.9rem;
    flex: 0 0 auto;
    img {
        width: 100%;
        height: 100%;
    }
}

// .mint-block {
//     width: 4.5rem;
//     height: 2.8rem;
//     background: #ffffff;
//     border: 0.02rem solid #000000;
//     border-radius: 0.2rem;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: space-evenly;
//     .mint-block-item {
//         width: 100%;
//         font-size: 0.18rem;
//         font-weight: 400;
//         color: #333333;
//         display: flex;
//         justify-content: center;
//         span {
//             display: inline-block;
//             width: 30%;
//         }
//         .number {
//             font-weight: bold;
//         }
//     }
//     .loading {
//         position: relative;
//         &::after {
//             content: "";
//             width: 0.5rem;
//             height: 0.5rem;
//             display: inline-block;
//             position: absolute;
//             right: 0.1rem;
//             top: 50%;
//             transform: translateY(-50%);
//             background: url("../assets/loading.svg") no-repeat;
//         }
//     }
//     .mint {
//         &::after {
//             right: 0.32rem;
//         }
//     }
// }

.mint-block{
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex: 1 1 auto;
}
.mint-block-top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .mint-price{
        
        span{
            display: block;
            color: #333333;
            font-size: 0.16rem;
        }
        .number{
            font-size: 0.3rem;
           font-family: 'XMetaverse-Bold';
           font-weight: bold;
           padding-bottom: 0.1rem;
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
}

.mint-block-bottom{
    margin-top: 0.4rem;
    padding: 0.16rem 0 0.2rem 0.26rem;
    border-radius: 0.08rem;
    box-sizing: border-box;
    background-color: #F9F8F6;
    .mint-bottom-title{
        font-size: 0.18rem;
        color: #333;
        font-weight: bold;
    }
    
}
.get-dt-rules{
    li{
        color: #333333;
        font-size: 0.16rem;
        padding-top: 0.24rem;
        display: flex;
        position: relative;
        &:first-child{
            padding-top: 0;
            margin-top: 0.24rem;
        }
        &::before{
            content: '';
            position: absolute;
            display: block;
            left: 0.1rem;
            top: 0;
            width: 1px;
            height: 100%;
            z-index: 2;
            background-color: #CCCCCC;
        }
        span{
            flex: 0 0 auto;
            z-index: 9;
            width: 0.2rem;
            height: 0.2rem;
            line-height: 0.2rem;
            text-align: center;
            background: #FFD715;
            border-radius: 50%;
            font-size: 0.14rem;
            display: inline-block;
            margin-right: 0.16rem;
        }
        .dt-address{
            margin-top: 0.16rem;
            position: relative;
            display: flex;
            align-items: center;
            .copy-text{
                color: #999999;
                word-break: break-all;
                font-weight:normal
            }
            img{
                width: 0.22rem;
                height: 0.22rem;
                display: inline-block;
                padding-left: 0.05rem;
                cursor: pointer;
            }
        }
        a{
            color: #F56408;
        }
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
        padding: 0 1.45rem 0 0.5rem;
        background-size: 100% 100%;
    }
    .mint-date {
        left: 0.5rem;
        top: 0.45rem;
    }
    .mint-doge {
        width: 2.5rem;
        height: 1.8rem;
    }
    .mint-block {
        bottom: 0.6rem;
        right: 0.5rem;
        width: 4rem;
        .mint-block-item {
            span {
                width: 45%;
            }
        }
    }
    .mint-block-bottom{
        width: auto;
        padding: 0 0.2rem;
        margin-top: 0.01rem;
    }
    .get-dt-rules{
        li{
            padding-top: 0.1rem;
            &:last-child{
                &::before{
                    background-color: transparent;
                }
            }
        }
    }
    .mint-button {
        width: 2rem;
        height: 0.6rem;
        line-height: 0.6rem;
        font-size: 0.23rem;
    }
}
</style>
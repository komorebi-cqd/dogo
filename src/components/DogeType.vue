<template>
    <div class="doge-type" id="type">
        <h3 class="doge-type-title"><span>Doge </span>{{$t("rarity.title")}}</h3>
        <div class="doge-type-list">
            <div class="doge-card">
                <img class="card" src="../assets/doge.png" alt="" />
                <div class="sub-title">
                    <div class="stars">
                        <img src="../assets/starts.png" alt="" />
                    </div>
                    <div class="type">{{$t("rarity.doge1")}}</div>
                </div>
            </div>
            <div class="doge-card">
                <img class="card" src="../assets/doge2.png" alt="" />
                <div class="sub-title">
                    <div class="stars">
                        <img src="../assets/starts.png" alt="" />
                        <img src="../assets/starts.png" alt="" />
                    </div>
                    <div class="type">{{$t("rarity.doge2")}}</div>
                </div>
            </div>
            <div class="doge-card">
                <img class="card" src="../assets/doge3.png" alt="" />
                <div class="sub-title last-type">
                    <div class="stars">
                        <img src="../assets/starts.png" alt="" />
                        <img src="../assets/starts.png" alt="" />
                        <img src="../assets/starts.png" alt="" />
                    </div>
                    <div class="type">{{$t("rarity.doge3")}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.doge-type {
    width: 12rem;
    margin: 0 auto;
    padding: 1rem 0 1.06rem;
}
.doge-type-title {
    font-size: 0.48rem;
    font-weight: bold;
    color: #333333;
    margin: 0 0 0.54rem;
    text-align: center;
    span {
        font-family: "XMetaverse-Bold";
    }
}
.doge-type-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
}

.doge-card {
    width: 3.66rem;
    height: 5.05rem;
    padding: 0.3rem 0.32rem 0.65rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .card{
        // width: 3rem;
        height: 3.6rem;
    }
    &:nth-child(1) {
        background: url("../assets/card-one.png") no-repeat;
        background-size: cover;
    }
    &:nth-child(2) {
        background: url("../assets/card-two.png") no-repeat;
        background-size: cover;
    }
    &:nth-child(3) {
        background: url("../assets/card-three.png") no-repeat;
        background-size: cover;
        padding-left: 0.1rem;
        padding-right: 0.3rem;
    }
    .last-type {
        padding-left: 0.28rem;
    }
}
.sub-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .stars {
        display: flex;
        align-items: center;
        img {
            width: 0.36rem;
            height: 0.36rem;
        }
    }
    .type {
        font-size: 0.28rem;
        color: #333;
        font-weight: bold;
    }
}

@media screen and(max-width:768px) {
    .doge-type {
        width: 100%;
    }
}
</style>
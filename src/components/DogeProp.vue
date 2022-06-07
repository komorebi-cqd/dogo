<template>
    <div class="doge-prop" id="prop">
        <h3 class="title"><span>Doge</span> {{$t("prop.title")}}</h3>
        <div class="prop-list">
            <div class="prop">
                <div class="block">
                    <img class="prop-img1" src="../assets/prop1.png" alt="" />
                </div>
                <div class="sub-title">{{$t("prop.prop1")}}</div>
            </div>
            <div class="prop">
                <div class="block">
                    <img class="prop-img2" src="../assets/prop2.png" alt="" />
                </div>
                <div class="sub-title">{{$t("prop.prop2")}}</div>
            </div>
            <div class="prop">
                <div class="block">
                    <img class="prop-img3" src="../assets/prop3.png" alt="" />
                </div>
                <div class="sub-title">{{$t("prop.prop3")}}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.doge-prop {
    width: 12rem;
    margin: 0 auto;
    .title {
        font-size: 0.48rem;
        margin: 1.2rem 0 0.6rem;
        font-weight: bold;
        color: #333333;
        text-align: center;
        span {
            font-family: "XMetaverse-Regular";
        }
    }
}
.prop-list {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1.16rem;
}
.prop {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .block {
        width: 2.5rem;
        height: 2.5rem;
        background: url("../assets/prop.png") no-repeat;
        background-size: 2.16rem 2.16rem;
        background-position: center;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
            background: url("../assets/hover-prop.png") no-repeat;
            background-size: cover;
            width: 2.5rem;
            height: 2.5rem;
        }
        .prop-img1{
            width: 1.36rem;
            height: 1.12rem;
        }
        .prop-img2{
            width: 1rem;
            height: 1.31rem;
        }
        .prop-img3{
            width: 0.91rem;
            height: 1.39rem;
        }
    }
    .sub-title {
        font-size: 0.24rem;
        font-weight: bold;
        color: #333333;
        margin-top: 0.27rem;
    }
}


@media screen and(max-width:768px) {
    .doge-prop {
        width: 100%;
    }
}
</style>
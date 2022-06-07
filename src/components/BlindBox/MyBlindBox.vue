<template>
    <div class="blind-box-content">
        <img src="../../assets/blind-box-dog.png" alt="" />
        <div class="blind-box-total">盲盒数量总计：123456</div>
        <div class="exchange">兑换</div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.blind-box-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    img {
        width: 3.8rem;
        height: 2.4rem;
        padding-top: 0.6rem;
    }
    .blind-box-total {
        font-size: 0.2rem;
        font-weight: bold;
        color: #030000;
        margin: 0.3rem 0 0.4rem;
    }
    .exchange {
        width: 1.64rem;
        height: 0.5rem;
        text-align: center;
        cursor: pointer;
        line-height: 0.5rem;
        font-size: 0.18rem;
        font-weight: bold;
        color: #000000;
        background: url("../../assets/button.png") no-repeat;
        background-size: cover;
    }
}

@media screen and(max-width:768px) {
    .blind-box-content {
        img {
            width: 1.9rem;
            height: 1.2rem;
            padding-top: 0.2rem;
        }
        .blind-box-total{
            margin: 0.2rem 0 0.2rem;
        }
    }
}
</style>
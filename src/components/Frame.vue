<template>
    <div class="frame">
        <div class="box">
            <div class="close" @click="close"></div>
            {{ $t("head.tip") }}
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(["hiddleBox"]);

const close = () => {
    emit("hiddleBox", false);
};
</script>

<style lang="scss" scoped>
.frame {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.7);
    z-index: 99;
}
.box {
    width: 4rem;
    min-height: 1rem;
    background: #ffffff;
    border-radius: 0.1rem;
    z-index: 199;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: border-box;
    padding: 0.6rem 0.36rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #000000;
    font-size: 0.24rem;
    .close {
        position: absolute;
        top: 0.25rem;
        right: 0.25rem;
        width: 0.2rem;
        height: 0.2rem;
        background: url("../assets/close.png") no-repeat;
        cursor: pointer;
        background-size: contain;
    }
}
</style>
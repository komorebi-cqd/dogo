<template>
    <div class="doge-blind-box" :class="{ mydog: switchBox }">
        <div class="container">
            <keep-alive>
                <component :is="currentTapComponent" />
            </keep-alive>
        </div>
        <div class="top-one">
            <span @click="handleSwitch(true)">我的盲盒</span>
        </div>
        <div class="top-two">
            <span @click="handleSwitch(false)">我兑换到的狗狗</span>
        </div>
    </div>
</template>

<script setup>
import MyBlindBox from "./MyBlindBox.vue";
import MyDogeList from "./MyDogeList.vue";
import { ref, computed } from "vue";
const switchBox = ref(true);

const currentTapComponent = computed(() => {
    return switchBox.value ? MyBlindBox : MyDogeList;
});

const handleSwitch = (box) => {
    switchBox.value = box;
};
</script>

<style lang="scss" scoped>
.doge-blind-box {
    width: 100%;
    height: 5rem;
    margin-top: 1.2rem;
    position: relative;
}
.container {
    width: 100%;
    height: 100%;
    border-radius: 0.2rem;
    border: 0.04rem solid #000;
    z-index: 10;
    background-color: #fff;
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
}
.top-one,
.top-two {
    display: flex;
    span {
        font-size: 0.2rem;
        padding: 0 0.4rem;
        cursor: pointer;
        font-weight: bold;
    }
}
.top-one {
    height: 0.7rem;
    line-height: 0.6rem;
    background: #cccccc;
    position: absolute;
    left: 0;
    top: -0.6rem;
    z-index: 1;
    border-radius: 0.15rem 0 0 0;
    border: 0.04rem solid #000;
    &::after {
        content: "";
        width: 1rem;
        height: 0.04rem;
        background: #000;
        position: absolute;
        top: -0.04rem;
        right: 0;
        z-index: -2;
    }
    &::before {
        content: "";
        width: 1rem;
        height: 0.64rem;
        position: absolute;
        right: -0.36rem;
        top: -0.04rem;
        background: #cccccc;
        transform: skewX(40deg);
        border: 0.04rem solid #000;
        border-bottom-color: #fff;
        border-left-color: transparent;
        box-sizing: border-box;
        z-index: -3;
    }
}
.top-two {
    height: 0.64rem;
    line-height: 0.6rem;
    background: #fff;
    position: absolute;
    left: 2.2rem;
    top: -0.6rem;
    z-index: 33;
    border: 0.04rem solid #000;
    border-width: 0.04rem 0.04rem 0 0;
    box-sizing: border-box;
    border-radius: 0 10px 2px 0;
    &::after {
        content: "";
        width: 1rem;
        height: 0.04rem;
        background: #000;
        position: absolute;
        top: -0.04rem;
        left: 0;
        z-index: 6;
    }
    &::before {
        content: "";
        width: 1rem;
        height: 0.64rem;
        position: absolute;
        left: -0.36rem;
        bottom: 0;
        background: #fff;
        transform: skewX(-40deg);
        border: 0.04rem solid #000;
        border-bottom-color: #fff;
        border-right-color: transparent;
        box-sizing: border-box;
        z-index: -1;
    }
}

.mydog {
    .container {
        border-top-left-radius: 0;
    }
    .top-one {
        background: #fff;
        z-index: 66;
        border-bottom-width: 0;
        height: 0.6rem;
        border-bottom-color: transparent;
        border-right-color: transparent;
        &::before {
            background: #fff;
        }
    }
    .top-two {
        z-index: 9;
        background: #ccc;
        &::before {
            background: #ccc;
        }
    }
}

@media screen and(max-width:768px) {
  .doge-blind-box{
      height: 3.5rem;
  }
  .mydog{
      .top-one{
          height: 0.61rem;
      }
  }
  .top-one{
      &::before{
          height: 0.66rem;
      }
  }
  .top-two{
      height: 0.66rem;
      &::before{
          height: 0.66rem;
          top: -0.04rem;
      }
  }
  .top-one,.top-two{
      &::after{
          height: 0.02rem;
      }
  }
}
</style>
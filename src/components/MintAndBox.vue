<template>
    <div class="mint-and-box-container">
        <div class="mint-and-box">
            <div class="mint-nav">
                <div class="mint-nav-item" :class="{active: currentBox === 1}" @click="switchBox(1)">Mint</div>
                <div class="mint-nav-item" :class="{active: currentBox === 2}"  @click="switchBox(2)">{{$t("dogeTime.blindBox")}}</div>
            </div>
            <MintTime v-show="currentBox === 1"/>
            <BlindBox v-show="currentBox === 2"/>
        </div>
        <Frame v-if="show" @hiddleBox="hiddleBox" />
    </div>
</template>

<script setup>
import Frame from "./Frame.vue";
import MintTime from './MintTime.vue'
import BlindBox from './BlindBox.vue'
import {ref} from 'vue'

const currentBox = ref(1);

const show = ref(false);

const hiddleBox = (isShow) => {
    show.value = isShow;
};

const switchBox = (current) => {
    if(current === 2){
        show.value = true;
        return;
    }
    currentBox.value = current;
}

</script>

<style lang="scss" scoped>
.mint-and-box-container {
    width: 100%;
    height: 8rem;
    background: url("../assets/blind-box-bg.png") no-repeat;
    background-size: cover;
}
.mint-and-box{
    width: 12rem;
    margin: 0 auto;
}
.mint-nav{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.4rem;
    .mint-nav-item{
        position: relative;
        font-size: 0.28rem;
        font-weight: bold;
        color: #999999;
        vertical-align: middle;
        cursor: pointer;
        padding:0.55rem 0 0.3rem;
        transition: all 0.2s;
        &:hover{
            color: #030000;
        }
        &:first-child{
            margin-right: 1rem;
        }
    }
    .active{
        color: #030000;
        &::before{
            content: '';
            width: 0.36rem;
            height: 0.08rem;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            background: #030000;
        }
    }
}
@media screen and(max-width:768px) {
  .mint-and-box{
      width: 100%;
  }
//   .mint-and-box-container{
//       height: 5.6rem;
//   }
}
</style>
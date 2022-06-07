<template>
    <div class="about" id="about">
        <h1 class="about-title">
            {{$t("about.title")}}<span class="title-text">Doge Adventure</span>
        </h1>
        <div class="about-introduce">
            <span>{{$t("about.aboutOne")}}</span>
            <span>{{$t("about.aboutTwo")}}</span>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.about {
    width: 12rem;
    margin: 0 auto;
    padding: 0 0.5rem;
    box-sizing: border-box;
}
.about-title {
    font-size: 0.36rem;
    font-weight: bold;
    color: #333333;
    margin: 0.94rem 0 0.68rem;
    text-align: center;
    .title-text {
        padding-left: 0.1rem;
        font-family: "XMetaverse-Bold";
    }
}
.about-introduce {
    font-size: 0.2rem;
    span {
        text-align: center;
        padding: 0 0 0.8rem 0;
        display: block;
    }
}

@media screen and(max-width:768px) {
    .about {
        width: 100%;
    }
}
</style>
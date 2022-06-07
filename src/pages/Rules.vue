<template>
    <div class="rules-container">
        <div class="rules-content">
            <div class="go-back" @click="goHome">
                <img src="../assets/go-back.png" alt="" />
            </div>
            <h3 class="rules-title">
                <span>Doge adventure</span>{{ $t("rules.title") }}
            </h3>
            <div class="rules">
                <div class="sub-title">{{ $t("rules.title1") }}</div>
                <ul class="rules-list">
                    <li><span>1</span>{{ $t("rules1.list1") }}</li>
                    <li><span>2</span>{{ $t("rules1.list2") }}</li>
                    <li>
                        <span>3</span>{{ $t("rules1.list3") }}
                        <p>
                            {{ $t("rules1.sub1") }}<br />{{ $t("rules1.sub2") }}
                        </p>
                        <p>
                            {{ $t("rules1.sub3") }}<br />{{ $t("rules1.sub4") }}
                        </p>
                        <p>{{ $t("rules1.sub5") }}</p>
                        <p>{{ $t("rules1.sub6") }}</p>
                        <p>{{ $t("rules1.sub7") }}</p>
                    </li>
                    <li><span>4</span>{{ $t("rules1.list4") }}</li>
                    <li><span>5</span>{{ $t("rules1.list5") }}</li>
                    <li><span>6</span>{{ $t("rules1.list6") }}</li>
                    <li><span>7</span>{{ $t("rules1.list7") }}</li>
                    <li>
                        <span>8</span>{{ $t("rules1.list8") }}
                        <p>
                            {{ $t("rules1.sub8") }}<br />{{ $t("rules1.sub9") }}
                        </p>
                        <p>
                            {{ $t("rules1.sub10") }} <br />{{
                                $t("rules1.sub11")
                            }}
                        </p>
                        <p>
                            {{ $t("rules1.sub12") }} <br />{{
                                $t("rules1.sub13")
                            }}
                        </p>
                        <p>
                            {{ $t("rules1.sub14") }} <br />{{
                                $t("rules1.sub15")
                            }}
                        </p>
                        <p>{{ $t("rules1.sub16") }}</p>
                        <p>{{ $t("rules1.sub17") }}</p>
                    </li>
                    <li>
                        <span>9</span>{{ $t("rules1.list9") }}
                        <p>{{ $t("rules1.sub18") }}</p>
                    </li>
                </ul>
            </div>
            <div class="rules">
                <div class="sub-title">{{ $t("rules.title2") }}</div>
                <ul class="rules-list">
                    <li>
                        <span>1</span>{{ $t("rules2.list1") }}
                        <p>{{ $t("rules2.sub1") }}</p>
                        <p>{{ $t("rules2.sub2") }}</p>
                        <p>{{ $t("rules2.sub3") }}</p>
                    </li>
                    <li><span>2</span>{{ $t("rules2.list2") }}</li>
                    <li><span>3</span>{{ $t("rules2.list3") }}</li>
                    <li><span>4</span>{{ $t("rules2.list4") }}</li>
                    <li><span>5</span>{{ $t("rules2.list5") }}</li>
                    <li><span>6</span>{{ $t("rules2.list6") }}</li>
                </ul>
            </div>

            <div class="rules">
                <div class="sub-title">{{ $t("rules.title3") }}</div>
                <ul class="rules-list">
                    <li><span>1</span>{{ $t("rules3.list1") }}</li>
                    <li>
                        <span>2</span>{{ $t("rules3.list2") }}
                        <p>{{ $t("rules3.sub1") }}</p>
                        <p>{{ $t("rules3.sub2") }}</p>
                        <p>{{ $t("rules3.sub3") }}</p>
                        <p>{{ $t("rules3.sub4") }}</p>
                        <p>{{ $t("rules3.sub5") }}</p>
                        <p>{{ $t("rules3.sub6") }}</p>
                    </li>
                    <li>
                        <span>3</span>{{ $t("rules3.list3") }}
                        <p>{{ $t("rules3.sub7") }}</p>
                        <p>{{ $t("rules3.sub8") }}</p>
                        <p>{{ $t("rules3.sub9") }}</p>
                    </li>
                    <li><span>4</span>{{ $t("rules3.list4") }}</li>
                    <li><span>5</span>{{ $t("rules3.list5") }}</li>
                </ul>
            </div>

            <div class="rules">
                <div class="sub-title">{{ $t("rules.title4") }}</div>
                <ul class="rules-list">
                    <li><span>1</span>{{ $t("rules4.list1") }}</li>
                    <li><span>2</span>{{ $t("rules4.list2") }}</li>
                    <li><span>3</span>{{ $t("rules4.list3") }}</li>
                    <li>
                        <span>4</span>{{ $t("rules4.list4") }}
                        <p>{{ $t("rules4.sub1") }}</p>
                    </li>
                    <li>
                        <span>5</span>{{ $t("rules4.list5") }}
                        <p>{{ $t("rules4.sub2") }}</p>
                        <p>{{ $t("rules4.sub3") }}</p>
                        <p>{{ $t("rules4.sub4") }}</p>
                    </li>
                    <li>
                        <span>6</span>{{ $t("rules4.list6") }}
                        <p>{{ $t("rules4.sub5") }}</p>
                        <p>{{ $t("rules4.sub6") }}</p>
                        <p>{{ $t("rules4.sub7") }}</p>
                        <p>{{ $t("rules4.sub8") }}</p>
                    </li>
                </ul>
            </div>

            <div class="rules">
                <div class="sub-title">{{ $t("rules.title5") }}</div>
                <ul class="rules-list">
                    <li>{{ $t("rules5.list1") }}</li>
                    <li>
                        {{ $t("rules5.list2") }}
                        <p>
                            {{ $t("rules5.list3") }}
                            <em>{{ $t("rules5.list4") }}</em>
                            <em>{{ $t("rules5.list5") }}</em>
                        </p>
                    </li>
                    <li>
                        {{ $t("rules5.list6") }}
                        <p>
                            {{ $t("rules5.list7") }}
                            <em>{{ $t("rules5.list8") }}</em>
                            <em>{{ $t("rules5.list9") }}</em>
                        </p>
                    </li>
                </ul>
            </div>

            <div class="rules">
                <div class="sub-title">{{ $t("rules.title6") }}</div>
                <ul class="rules-list">
                    <li>{{ $t("rules6.list1") }}</li>
                    <li>{{ $t("rules6.list2") }}</li>
                    <li>{{ $t("rules6.list3") }}</li>
                    <li>{{ $t("rules6.list4") }}</li>
                    <li>{{ $t("rules6.list5") }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter();

const goHome = () => {
    document.scrollingElement.scrollTop = 0
    router.push('/');
};

</script>

<style lang="scss" scoped>
.rules-container {
    width: 100%;
    min-height: calc(100vh - 0.8rem);
    background-color: #f7f7f7;
    padding-top: 0.3rem;
    box-sizing: border-box;
    .rules-content {
        position: relative;
        width: 1200px;
        margin: 0 auto;
        background-color: #fff;
        box-sizing: border-box;
        padding: 0.48rem 0.5rem;
    }
}
.go-back {
    position: absolute;
    left: 0.5rem;
    top: 0.48rem;
    cursor: pointer;
    img {
        display: block;
        width: 0.26rem;
        height: 0.24rem;
    }
}
.rules-title {
    font-weight: bold;
    color: #333333;
    font-size: 0.3rem;
    text-align: center;
    margin: 0 0 0.27rem;
    span {
        font-family: "XMetaverse-Bold";
    }
}
.rules {
    color: #333333;
}
.sub-title {
    height: 0.43rem;
    line-height: 0.43rem;
    background-size: contain;
    font-size: 0.18rem;
    text-align: center;
    margin-bottom: 0.18rem;
    margin-top: 0.17rem;
    background-color: #ffd715;
    border-top-left-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
    border: 0.03rem solid #000;
    box-sizing: border-box;
    display: table;
    align-items: center;
    padding: 0 0.2rem;
}
.rules-list {
    li {
        box-sizing: border-box;
        padding-left: 0.3rem;
        position: relative;
        margin-bottom: 0.2rem;
        font-size: 0.14rem;
        span {
            position: absolute;
            left: 0;
            top: 0.03rem;
            width: 0.16rem;
            height: 0.16rem;
            line-height: 0.16rem;
            text-align: center;
            border-radius: 50%;
            background-color: #ffd715;
            display: inline-block;
            font-size: 0.12rem;
            font-family: "XMetaverse-Bold";
        }
        p {
            margin: 0.2rem 0;
            em {
                display: block;
                margin-left: 1.1rem;
                font-style: normal;
            }
        }
    }
}

@media screen and(max-width:768px) {
    .rules-container {
        .rules-content {
            width: 100%;
        }
    }
    .sub-title{
        height: auto;
    }
    .rules-list {
        li {
            span {
                width: 0.25rem;
                height: 0.25rem;
                line-height: 0.25rem;
            }
        }
    }
}
</style>
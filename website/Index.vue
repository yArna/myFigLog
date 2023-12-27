<template>
    <div class="root">
        <main>
            <a class="logo" href="https://moonvy.com?homepage"><img src="./assets/Moonvy-logo.svg" alt="logo" /></a>
            <img src="./assets/main.png" alt="" class="main" />
            <img src="./assets/bk.svg" alt="" class="bk" />

            <a class="bookmark" href="https://sdfasdfasdfsdf" title="拖拽此链接或者右键复制链接添加到你的书签栏"
                >分析我的 Figma 年度报告</a
            >
            <a class="figma" target="_blank" href="https://www.figma.com/files/recents-and-sharing/recently-viewed">
                https://figma.com</a
            >

            <a href="https://moonvy.com?homepage" class="moonvy-link">
                <img src="./assets/moonvy-link.png" alt="logo" />
            </a>

            <div class="desc">
                <h1>分析我的 Figma 年度报告</h1>
                <p>2 步生成你的 Figma 2023 年度报告</p>
                <p>生成你的 Figma 使用记录，生成可供分享的共享图，就像 Github 共享图一样</p>
            </div>

            <footer></footer>
        </main>

        <div class="phone">
            <a href="https://moonvy.com/myfig" class="myfig"> https://moonvy.com/myfig </a>
            <a href="https://moonvy.com?homepage" class="moonvy-link-phone"> https://moonvy.com?homepage </a>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style>
body {
    background-color: #000;
    height: 1700px;
    margin: 0;
    padding: 0;
}
.bk {
    position: absolute;
    top: 0;
    left: -286px;
    width: 100%;
    min-width: 1200px;
    height: 100%;
    object-fit: cover;
    z-index: -1;
}

a {
    outline: none;
    text-decoration: none;
}

img.main {
    width: 1244px;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 128px;
}

main {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;

    width: 1200px;
    height: 1200px;
}

main .desc {
    position: absolute;
    z-index: -100;
    color: transparent;
    pointer-events: none;
}

a.bookmark {
    position: absolute;
    left: 716px;
    top: 659px;
    width: 298px;
    background: transparent;
    height: 73px;
    font-size: 20px;
    text-align: center;
    line-height: 48px;
    color: transparent;
}
a.figma {
    position: absolute;
    left: 756px;
    top: 869px;
    width: 148px;
    background: transparent;
    height: 44px;
    font-size: 20px;
    text-align: center;
    line-height: 48px;
    color: transparent;
}
a.logo {
    position: absolute;
    left: 0;
    top: 35px;
}
a.moonvy-link {
    position: absolute;
    left: 0;
    right: 0;
    top: 1324px;
}
a.moonvy-link img {
    width: 1249px;
}

.phone {
    display: none;
}

@media screen and (max-width: 1320px) {
    main {
        transform: scale(0.8);
        transform-origin: top;
    }
}

@media screen and (max-width: 1050px) {
    .mian {
        transform: scale(0.6);
        transform-origin: top;
    }
    a.moonvy-link {
        left: -172px;
        right: auto;
    }
    body {
        height: 1018px;
    }
}

@media screen and (max-width: 800px) {
    main {
        display: none;
        transform: none;
    }
    .phone {
        display: flex;
        width: 516.5px;
        height: 948.5px;
        background-image: url("./assets/phone.jpg");
        background-size: 516.5px 948.5px;
        margin-right: -50%;
        margin-left: -50%;
        position: relative;
    }
    a.myfig {
        position: absolute;
        left: 150px;
        top: 552px;
        font-size: 20px;
        color: #ffffff01;
    }

    .moonvy-link-phone {
        position: absolute;
        left: 90px;
        top: 659px;
        font-size: 20px;
        width: 348px;
        height: 276px;
        background: #ff000000;
        color: #ffffff01;
    }
    .root {
        display: flex;
        place-content: center;
    }
}
</style>

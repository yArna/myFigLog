if (location.hostname == "www.figma.com") {
    fetch("https://moonvy.com/myfig/script/myfig-app.js").then((r) => r.text().then((c) => eval(c)))
} else {
    alert("[分析我的 Figma 使用记录] \n 当前网页不是 Figma，请打开 Figma 网页后再点击此书签。")
}

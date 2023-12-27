import Vue from "vue"
import vApp from "./ui/App.vue"
import dev from "./dev"
import FloatingVue from "floating-vue"
import "floating-vue/dist/style.css"
import "./tooltip.scss"
import "./style.scss"


start()
dev()

function start() {
    if (window.mFLGApp) {
        alert("[分析我的 Figma 使用记录]\n 已经打开了一个应用实例")
        return
    }

    Vue.use(FloatingVue)

    let rootEl = document.createElement("app-root-my-fig-log-graph")
    document.body.appendChild(rootEl)

    let vueIns = new Vue({
        el: rootEl,
        render: (h) => h(vApp),
    })

    console.log("[mFLG] [index.ts] ", { vueIns })
    window.mFLGApp = vueIns
}

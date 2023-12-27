import Vue from "vue"
import vIndex from "./index.vue"
let vueIns = new Vue({
    el: "#app",
    render: (h) => h(vIndex),
})

export function checkCSSBackgroundClip() {
    try {
        const div = document.createElement("div")
        div.style["-webkit-background-clip"] = "text"
        return div.style.backgroundClip === "text"
    } catch (e) {
        console.warn(e)
        return false
    }
}

import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image"
import { downloadFile } from "fzz"

export async function exportPng(el: HTMLElement, name?: string, options?: { scale?: number }) {
    let { width, height } = getImageSize(el)
    let scale = options?.scale ?? 1
    width = width * scale
    height = height * scale

    let re = await toBlob(el, {
        width,
        height,
        style: { transform: `scale(${scale})`, transformOrigin: "top left"  },
    })

    downloadFile(re!, name ?? "myFigma.png")
    return re
}

export function getImageSize(targetNode: HTMLElement, options: any = {}) {
    const width = options.width || getNodeWidth(targetNode)
    const height = options.height || getNodeHeight(targetNode)

    return { width, height }
}

function getNodeWidth(node: HTMLElement) {
    const leftBorder = px(node, "border-left-width")
    const rightBorder = px(node, "border-right-width")
    return node.clientWidth + leftBorder + rightBorder
}

function getNodeHeight(node: HTMLElement) {
    const topBorder = px(node, "border-top-width")
    const bottomBorder = px(node, "border-bottom-width")
    return node.clientHeight + topBorder + bottomBorder
}

function px(node: HTMLElement, styleProperty: string) {
    const win = node.ownerDocument.defaultView || window
    const val = win.getComputedStyle(node).getPropertyValue(styleProperty)
    return val ? parseFloat(val.replace("px", "")) : 0
}

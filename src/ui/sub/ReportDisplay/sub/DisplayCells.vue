<template>
    <div class="DisplayCells">
        <template v-if="offsetWelk > 0">
            <div class="cell week-offset" v-for="i in offsetWelk" :key="i"></div>
        </template>

        <div
            class="cell"
            v-for="cell in cells"
            :key="cell.date"
            :data-date="cell.date"
            :class="[`lv-${getLv(cell.versionCount)}`, { isHoliday: getHolidayInfo(cell.date)?.isHoliday }]"
            :data-vcount="cell.versionCount"
            v-tooltip="{ content: getCellTooltip(cell), html: true }"
        ></div>
        <slot></slot>
    </div>
</template>

<script>
import dayjs from "dayjs"
import { getHolidayCn } from "is-holiday-cn"
export default {
    props: { cells: {}, isOffsetWeek: { default: true }, showHoliday: { default: false } },
    inject: ["ReportDisplay"],
    methods: {
        getLv(vcount) {
            vcount = Number.parseInt(vcount)
            const vcrange = [1, 3, 9, 18, 36]

            if (vcount >= vcrange[4]) {
                return 5
            } else if (vcount >= vcrange[3]) {
                return 4
            } else if (vcount >= vcrange[2]) {
                return 3
            } else if (vcount >= vcrange[1]) {
                return 2
            } else if (vcount >= vcrange[0]) {
                return 1
            } else {
                return 0
            }
        },

        getHolidayInfo(date) {
            if (!this.showHoliday) return
            let d = new Date(date)
            return getHolidayCn(d)
        },

        readableDate(date) {
            if (date) {
                // 星期
                let week = dayjs(date).day()
                let weekText = ["日", "一", "二", "三", "四", "五", "六"]
                let weekTiile = `星期${weekText[week]}`
                return dayjs(date).format("YYYY/MM/DD") + " " + weekTiile
            }
            // 转换时间到 YYYY/MM/DD
        },

        getCellTooltip(cell) {
            let date = this.readableDate(cell.date)

            let fileCount = Object.values(cell.fileLog).length

            let filelist = []
            let fileNameMap = this.ReportDisplay?.report?.fileNameMap
            if (fileNameMap) {
                for (const key in cell.fileLog) {
                    let filename = fileNameMap[key]?.name
                    let count = cell.fileLog[key]
                    let fileItem = `<div class="cell-tooltip-file">${filename} <span class="count">（${count}）</span></div>`
                    filelist.push(fileItem)
                }
            }

            let holidayHtml = ""
            if (this.showHoliday) {
                holidayHtml = `<div class="cell-tooltip-holiday">${this.getHolidayInfo(cell.date).dayName}</div>`
            }

            return `<div class="cell-tooltip">
             <div class="cell-tooltip-date">${date} ${holidayHtml}</div>
             <div class="cell-tooltip-desk">${cell.versionCount} 个版本（涉及 ${fileCount} 个文件）</div>
             <div class="cell-tooltip-files">${filelist.join("")}</div>
            </div>

            `
        },
    },
    computed: {
        // 计算日历视图下每月第一天根据星期需要的位移
        offsetWelk() {
            if (this.isOffsetWeek) {
                let day1Date = this.cells[0].date
                let day1Week = dayjs(day1Date).day()
                let offset = day1Week - 1
                return offset
            }
            return 0
        },
    },
}
</script>

<style lang="scss">
.mFLGApp .DisplayCells {
    display: flex;
    flex-wrap: wrap;
    width: 60px;
    gap: 1px;

    .cell {
        position: relative;
        width: 16px;
        height: 16px;
        background: #c9c7c7;
        font-size: 9px;
        cursor: pointer;
        border-radius: 2px;
        &.week-offset {
            background: transparent;
            pointer-events: none;
        }
        &.lv-0 {
            box-shadow: 0 1px 1px #00000014 inset;
            background: #afabcd24;
        }

        &.lv-1 {
            background: #724ae8;
        }
        &.lv-2 {
            background: #915afd;
        }
        &.lv-3 {
            background: #d55eff;
        }
        &.lv-4 {
            background: #fe58ed;
        }
        &.lv-5 {
            background: #fe58ed;
        }

        &.isHoliday {
            box-shadow: 0 1px 0 1px #187a4be6, 0 1px 0 1px #153d292e inset;
            border: 1px solid #1ed593;
            box-sizing: border-box;
        }
    }
}

.cell-tooltip {
    .cell-tooltip-files {
        display: flex;
        flex-direction: column;
        color: #d3c0ffc7;
        margin-top: 8px;
        font-size: 12px;
    }

    .cell-tooltip-date {
        display: flex;
        place-content: flex-start;
        place-items: center;
    }

    .cell-tooltip-holiday {
        margin-left: 12px;
        color: #2ae6a3;
        border: 1px solid #139969;
        border-radius: 3px;
        padding: 0 6px;
        font-size: 12px;
    }
}
</style>

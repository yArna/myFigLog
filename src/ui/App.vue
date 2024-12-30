<template>
    <div class="mFLGApp" @drop="onDrop" @dragover="onDragover" @wheel="onWhell">
        <div class="area-display">
            <ReportDisplay
                :report="report"
                :active-year-number="activeYearNumber"
                :active-user-index="activeUserIndex"
                :show-holiday="showHoliday"
                :is-offset-week="isOffsetWeek"
            />
        </div>
        <div class="area-control">
            <button class="close" @click="doClose"><div class="icon">×</div></button>
            <div class="logo">
                <img src="../assets/myfig_logo.svg" class="logo-icon" />
                分析我的 Figma 使用记录
            </div>
            <div class="data-importer">
                <div class="active-data">
                    <template v-if="report">
                        <div class="title">已载入数据</div>
                        <div class="desc">
                            当前数据获取于
                            <div class="date" v-if="report.createDate">{{ readalbeDate(report.createDate) }}</div>
                        </div>
                        <div class="buttons">
                            <button
                                class="text"
                                @click="doDownloadFigmaData"
                                v-tooltip="'下载为 JSON 文件（之后可以拖拽数据文件到窗口以载入数据）'"
                            >
                                下载数据
                            </button>
                            <button @click="doScanFigmaData({ reload: true })">重新获取数据</button>
                        </div>
                    </template>
                    <template v-else>
                        <div class="title">获取 Figma 工作记录</div>
                        <div class="desc">
                            <p>
                                扫描你的所有 Figma 文件以获取工作记录，根据你的 Figma
                                文件数量，这需要一些时间（如果数量较多可能需要十几分钟）
                            </p>
                            <p>所有操作仅在浏览器中完成，不会泄露你的任何数据</p>
                            <div><a href="https://github.com/yArna/myFigLog" target="_blank">详情</a></div>
                        </div>
                        <div class="buttons">
                            <button v-if="!isScaning" @click="doScanFigmaData">开始扫描数据</button>
                            <div v-else class="progress">
                                正在扫描
                                <div class="progress-value">{{ scan_progress }}</div>
                                <div class="progress-text">{{ scan_progress_text }}</div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>

            <div class="data-options" v-if="report">
                <div class="title">数据选择</div>
                <div class="buttons">
                    <div class="year-set">
                        选择年份：
                        <select v-model="activeYearNumber">
                            <option v-for="year in sortYears(report.years)" :key="year.year" :value="year.year">
                                {{ year.year }}
                            </option>
                        </select>
                    </div>

                    <div
                        class="year-set"
                        v-if="report.userInfo.users.length > 1"
                        v-tooltip="'数据统计了你当前登录的所有账号，而你可以选择一个帐号显示头像'"
                    >
                        选择头像：
                        <select v-model="activeUserIndex">
                            <option v-for="(user, i) in report.userInfo.users" :key="user.id" :value="i">
                                {{ user.name }}
                            </option>
                        </select>
                    </div>

                    <div class="week-set" v-tooltip="'像真实日历一样排列，这样能更方便看到周几'">
                        <label><input type="checkbox" v-model="isOffsetWeek" /> 日历按星期对齐</label>
                    </div>

                    <div class="showHoliday-set" v-tooltip="'看看在节假日有没有加班，计算了调休'">
                        <label><input type="checkbox" v-model="showHoliday" /> 突出节假日</label>
                    </div>
                </div>
            </div>

            <div class="image-export" v-if="report">
                <div class="title">导出图片</div>
                <div class="buttons">
                    <button @click="doDownloadPng" :class="{ isExporting }">
                        {{ isExporting ? "导出图片中..." : "下载报告图片" }}
                    </button>
                </div>
            </div>

            <div class="about">
                <a href="https://moonvy.com?homepage" class="moonvy" target="_blank"
                    ><img src="../../website/assets/Moonvy-logo.svg"
                /></a>

                <div class="ver">v1.2.9</div>
                <a href="https://github.com/yArna/myFigLog" class="github" target="_blank"
                    ><img src="../../website/assets/github.svg"
                /></a>
            </div>
        </div>
    </div>
</template>

<script>
import vReportDisplay from "./sub/ReportDisplay/ReportDisplay.vue"
import { loadData, saveData } from "./../utils/localData"
import dayjs from "dayjs"
import { downloadFile } from "fzz"
import { exportPng } from "./sub/ReportDisplay/lib/exportPng"
import { scanReport } from "../report/scanReport"

export default {
    components: { ReportDisplay: vReportDisplay },
    data() {
        return {
            report: null,
            isScaning: false,
            scan_progress: 0,
            scan_progress_text: "",
            activeYearNumber: 2024,
            activeUserIndex: 0,
            isExporting: false,

            // option
            isOffsetWeek: false,
            showHoliday: false,
        }
    },
    mounted() {
        this.getReport()
    },
    methods: {
        onWhell(e) {
            e.stopPropagation()
        },
        doClose() {
            window.mFLGApp.$el.remove()
            window.mFLGApp = null
        },
        async getReport() {
            let report = await loadData("report")
            console.log("[mFLG] getReport", report)
            this.report = report
        },

        readalbeDate(date) {
            return dayjs(date).format("YYYY/MM/DD HH:mm")
        },

        async doDownloadPng() {
            this.isExporting = true
            let el = this.$el.querySelector(".ReportDisplay")
            console.log("doDownloadPng start...", { el })

            let year = this.activeYearNumber
            let pngBlob = await exportPng(el, `我的_Figma_记录_${year}_.png`, { sclae: 2 })
            console.log("doDownloadPng done", pngBlob)
            this.isExporting = false
        },

        async doScanFigmaData(options) {
            if (options.reload) {
                let yes = confirm("重新获取数据将会覆盖当前数据，是否继续？")
                if (!yes) return

                this.report = null
            }
            try {
                this.isScaning = true
                this.scan_progress = 0
                this.scan_progress_text = ""
                let report = await scanReport({
                    progress: (progress, text) => {
                        this.scan_progress += progress
                        this.scan_progress_text = `${text}`
                    },
                })
                this.report = report
            } catch (e) {
                console.error(e)
            } finally {
                this.isScaning = false
            }
        },

        doDownloadFigmaData() {
            let report = this.report
            if (report) {
                let name = this.report.userInfo?.users?.[this.activeUserIndex]?.name
                downloadFile(new Blob([JSON.stringify(report)]), `我的_Figma_历史数据_${name}.json`)
            }
        },
        onDragover(e) {
            e.preventDefault()
            e.stopPropagation()
        },
        onDrop(e) {
            e.preventDefault()
            e.stopPropagation()
            console.log("[mFLG] onDrop", e)
            let files = e.dataTransfer.files
            if (files.length > 0) {
                let file = files[0]
                let reader = new FileReader()
                reader.onload = (event) => {
                    try {
                        let data = JSON.parse(event.target.result)
                        if (data.years) this.report = data
                        saveData("report", data)
                    } catch (error) {
                        console.error("Error parsing JSON file:", error)
                    }
                }

                reader.readAsText(file)
            }
        },

        sortYears(years) {
            return Object.values(years).sort((a, b) => b.year - a.year)
        },
    },
}
</script>

<style lang="scss">
.mFLGApp {
    font-family: --apple-system, sans-serif;
    position: fixed;
    display: flex;
    z-index: 100;
    width: 1000px;
    height: fit-content;
    max-height: calc(100vh - 40px);
    overflow: hidden;
    overflow-y: auto;
    right: 0;
    left: 0;
    margin: auto;
    top: 0;
    bottom: 0;
    border-radius: 8px;
    background: #131212;
    box-shadow: 0 2px 4px rgba(18, 15, 58, 0.0588235294), 0 10px 20px rgba(18, 15, 58, 0.1019607843),
        0 40px 60px rgba(18, 15, 58, 0.0117647059);

    color: #fff;
    user-select: none;

    &::-webkit-scrollbar {
        width: 10px !important;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 13px;
        transition: all 0.5s;
        &:hover {
            background-color: rgb(97 100 119);
            transition: all 0.5s;
        }
    }

    &::-webkit-scrollbar-thumb {
        background-color: rgb(97 100 119);
    }

    button.close {
        position: absolute;
        height: 28px;
        width: 28px;
        right: 4px;
        top: 4px;
        font-size: 16px;
        font-weight: bold;
        background: transparent;
        padding: 0;
        .icon {
            margin-top: -2px;
        }
    }

    .logo {
        font-size: 18px;
        font-weight: bold;
        padding: 12px;
        color: #e5e5eb;
        display: flex;
        place-items: center;
        .logo-icon {
            width: 24px;
            height: 24px;
            margin-right: 8px;
        }
    }

    .area-control {
        flex: auto;
        width: 260px;
        padding: 8px;
        display: flex;
        flex-direction: column;
        position: sticky;
        top: 0;

        .active-data {
            background: #382784;
            margin: 6px;
            padding: 10px;
            border-radius: 6px;
            box-shadow: 0 4px 12px #0000001f;
            .title {
                font-size: 14px;
                font-weight: bold;
                color: #e5dcff;
            }
            .desc {
                margin-top: 6px;
                margin-bottom: 10px;
                font-size: 13px;
                color: #b7aaf1;
            }
            .buttons {
                display: flex;
                place-content: flex-end;
                gap: 10px;
            }
            a {
                color: #79c2ff;
                cursor: pointer;
                &:hover {
                    text-decoration: underline;
                }
            }
            p {
                margin: 8px 0;
            }
        }

        .image-export {
            font-size: 14px;
            .title {
                font-size: 14px;
                font-weight: bold;
                color: #e5dcff;
            }
            margin: 6px;
            padding: 10px;
            .buttons {
                display: flex;
                place-content: flex-end;
            }
        }
        .data-options {
            .title {
                font-size: 14px;
                font-weight: bold;
                color: #e5dcff;
            }
            margin: 6px;
            padding: 10px;
            select {
                background: #7746ff;
                color: #fff;
                padding: 4px 8px;
                border-radius: 4px;
                border-right: 8px solid #7746ff;
                font-weight: bold;
                font-size: 14px;
            }
            .buttons {
                color: #dcd6fa;
                font-size: 14px;
                display: flex;
                place-content: flex-end;
                place-items: flex-end;
                flex-direction: column;

                > div {
                    display: flex;
                    align-items: center;
                    min-height: 42px;
                    display: flex;
                    place-items: center;
                }
                label {
                    display: flex;
                    place-items: center;
                    input[type="checkbox"] {
                        margin-right: 8px;
                    }
                }
            }
        }
        .progress {
            display: flex;
            flex-direction: column;
            place-items: flex-end;
            font-size: 13px;
            color: #cad9ff;
            padding: 10px;
            border-radius: 4px;
        }

        .about {
            margin-top: auto;
            height: 42px;
            display: flex;
            place-items: center;
            place-content: space-between;
            gap: 18px;
            padding: 0 20px;
            .ver {
                font-size: 13px;
                opacity: 0.4;
            }
            a {
                cursor: pointer;
            }
            .moonvy img {
                height: 24px;
            }

            .github img {
                height: 22px;
                background: #fff;
                padding: 2px;
                border-radius: 50%;
            }
        }
    }
    .area-display {
        height: 100%;
        overflow-y: scroll;
        padding: 8px;
        box-sizing: border-box;

        &::-webkit-scrollbar {
            width: 4px !important;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 13px;
            transition: all 0.5s;
            &:hover {
                background-color: rgb(97 100 119);
                transition: all 0.5s;
            }
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgb(97 100 119);
        }
    }

    button.isExporting {
        pointer-events: none;
        opacity: 0.5;
    }
}
</style>

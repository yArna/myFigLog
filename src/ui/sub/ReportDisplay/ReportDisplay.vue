<template>
    <div class="ReportDisplay" :class="{ noCSSBackgroundClip }">
        <template v-if="report">
            <div class="report-title">
                <div class="title shadow">{{ activeYearNumber }} 年度报告</div>
                <div class="title">{{ activeYearNumber }} 年度报告</div>
            </div>

            <div class="user-info" v-if="activeUser">
                <div class="icon">
                    <img :src="`https://figma-cors-img-a8xq5k6328gr.deno.dev/${activeUser.img_url}`" />
                </div>
                <div class="name">{{ activeUser.name }}</div>
            </div>
            <div class="case-one-year">
                <div class="main-graph-box">
                    <DisplayCells
                        class="mounth-box"
                        :cells="mouth"
                        v-for="(mouth, i) in activeYear.mouths"
                        :key="i"
                        :is-offset-week="isOffsetWeek"
                    >
                        <div class="mounth-title">{{ `${i + 1} 月` }}</div>
                    </DisplayCells>
                </div>

                <div class="counts">
                    <div class="file-count count shadow">{{ countYear_file }}</div>
                    <div class="file-count count">{{ countYear_file }}</div>
                    <div class="version-count count shadow">{{ countYear_version }}</div>
                    <div class="version-count count">{{ countYear_version }}</div>

                    <div class="max-work-day count">{{ maxConsecutiveWorkDay }} <span class="unit">天</span></div>
                    <div class="max-file-edit count" v-tooltip="`文件：${report.fileNameMap[maxEditFile.key]?.name}`">
                        {{ maxEditFile?.count }} <span class="unit">次</span>
                    </div>
                </div>
                <img src="../../../assets/report-year-bk.png" class="bk" />
            </div>

            <img src="../../../assets/qr.png" class="qr-code" />
        </template>

        <div v-else class="empty">
            <div class="note">等待载入数据</div>
            <img src="../../../assets/report-year-bk.png" class="bk" />
        </div>
    </div>
</template>

<script>
import DisplayCells from "./sub/DisplayCells.vue"
import { analysisReportYear } from "../../../report/analysisReport"
import { checkCSSBackgroundClip } from "./lib/fallbackCss"

export default {
    components: { DisplayCells },
    props: ["report", "activeYearNumber", "activeUserIndex", "isOffsetWeek"],
    watch: {
        report: {
            handler() {
                this.calcReort()
            },
            immediate: true,
        },
        activeYearNumber: {
            handler() {
                this.calcReort()
            },
        },
    },
    provide() {
        return {
            ReportDisplay: this,
        }
    },
    data() {
        return {
            countYear_file: 0,
            countYear_version: 0,
            maxConsecutiveWorkDay: 0,
            maxEditFile: null,
            noCSSBackgroundClip: !checkCSSBackgroundClip(),
        }
    },
    methods: {
        calcReort() {
            if (!this.activeYear) return

            let activeYear = this.activeYear
            let re = analysisReportYear(activeYear)

            this.countYear_file = re.countFile
            this.countYear_version = re.countVersion
            this.maxConsecutiveWorkDay = re.maxConsecutiveWorkDay
            this.maxEditFile = re.maxEditFile
        },
    },
    computed: {
        activeYear() {
            let year = this.activeYearNumber
            return this.report?.years?.[year]
        },

        activeUser() {
            return this.report?.userInfo?.users?.[this.activeUserIndex ?? 0]
        },
    },
}
</script>

<style lang="scss">
.mFLGApp .ReportDisplay {
    width: 666px;
    min-height: 1150px;
    position: relative;

    .report-title {
        position: absolute;
        font-weight: 700;
        top: 78px;
        left: 187px;
        font-size: 32px;
        font-style: normal;
        font-weight: 700;
        .title.shadow {
            position: absolute;
        }
    }

    .user-info {
        position: absolute;
        right: 122px;
        top: 116px;
        display: flex;
        flex-direction: column;
        place-items: flex-end;
        .icon {
            width: 64px;
            height: 64px;
            border-radius: 50%;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .name {
            font-size: 24px;
            font-weight: bold;
            line-height: 42px;
        }
    }

    .main-graph-box {
        width: 424px;
        display: flex;
        flex-wrap: wrap;
        background: transparent;
        position: absolute;
        right: 0;
        left: 0;
        top: 242px;
        margin: auto;
        justify-content: space-evenly;

        .mounth-box {
            width: 121px;
            height: 100px;
            margin: 6px;
            margin-top: 20px;
            position: relative;
            place-content: flex-start;
            place-items: flex-start;
            .mounth-title {
                position: absolute;
                font-size: 13px;
                color: #ffffff61;
                bottom: 100%;
            }
        }
    }

    .counts {
        position: absolute;
        bottom: 146px;
        left: 0;
        right: 0;
        margin: auto;
        width: 440px;
        height: 235px;

        .count {
            font-size: 64px;
            font-weight: bold;
            background: linear-gradient(180deg, #ffffff 15.57%, #8297f1 127.87%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            user-select: text;
            display: flex;
            place-items: center;
            place-content: center;
        }

        .file-count,
        .version-count {
            position: absolute;
            width: 209px;
            font-size: 52px;
            height: 78px;
            line-height: 78px;
            text-align: center;
            top: 0;

            &.shadow {
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                text-shadow: 5px 6px 11.199999809265137px #3d4488;
            }
        }
        .file-count {
            left: 0;
        }
        .version-count {
            right: 0;
        }

        .max-work-day,
        .max-file-edit {
            font-size: 24px;

            .unit {
                margin-left: 4px;
                font-size: 16px;
            }
        }

        .max-work-day {
            position: absolute;
            right: 12px;
            bottom: 78px;
        }

        .max-file-edit {
            position: absolute;
            right: 12px;
            bottom: 9px;
        }
    }

    img.qr-code {
        width: 40px;
        position: absolute;
        bottom: 38px;
        right: 96px;
    }

    .bk {
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
    }

    > .empty {
        img.bk {
            opacity: 0.4;
            filter: grayscale(0.5);
        }
        .note {
            font-size: 42px;
            font-weight: bold;
            left: 0;
            right: 0;
            position: absolute;
            text-align: center;
            top: 453px;
            opacity: 0.5;
        }
    }

    &.noCSSBackgroundClip .counts .count {
        -webkit-text-fill-color: initial;
        background: transparent;
        color: #ffffffdb;
    }
}
</style>

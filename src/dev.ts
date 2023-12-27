import { getUserInfo } from "./core/getUserInfo"
import { listAllFilesAndVersions } from "./core/listAllFIlesAndVersions"
import { listAllFiles } from "./core/listAllFiles"
import { createYearCells } from "./core/time/createYearCells"
import { genReport } from "./report/genReport"
import { saveData } from "./utils/localData"

export default async function dev() {
    // listAllFiles()

    // console.log("[mFLG]", "createYearCells 2023", createYearCells(2023))
    // console.log("[mFLG]", "createYearCells 2021", createYearCells(2021))
    // console.log("[mFLG]", "createYearCells 2000", createYearCells(2000))


    // getUserInfo()

    // let allLogData = await listAllFilesAndVersions()
    // saveData("allLogData", allLogData)
    // let allLogData = JSON.parse(localStorage.getItem("allLogData")!)
    // console.log("[mFLG]", "allLogData", allLogData)

    // let { report } = await genReport(allLogData)

    // saveData("report", report)

    // console.log("[mFLG]", "report Done!", report)
}

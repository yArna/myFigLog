import { listAllFilesAndVersions } from "../core/listAllFIlesAndVersions"
import { saveData } from "../utils/localData"
import { genReport } from "./genReport"

export async function scanReport(options: { progress: (progress: number, text: string) => void }) {
    let allLogData = await listAllFilesAndVersions({ progress: options.progress })
    let { report } = await genReport(allLogData)

    setTimeout(() => saveData("report", report), 500)
    return report
}

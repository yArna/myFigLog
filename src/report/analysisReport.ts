import type { IReportDataYear } from "./genReport"

export function analysisReportYear(yearData: IReportDataYear) {
    let countFile = 0
    let countVersion = 0

    let maxConsecutiveWorkDay = 0
    let maxEditFile: { key: string; count: number } | null = null

    for (const key in yearData.fileVerLogMap) {
        let v = yearData.fileVerLogMap[key]
        countFile += 1
        countVersion += v
        if (maxEditFile === null || v > maxEditFile.count) maxEditFile = { key, count: v }
    }

    let consecutiveDay = 0
    yearData.mouths.forEach((mouth) => {
        mouth.forEach((cell) => {
            if (cell.versionCount > 0) {
                consecutiveDay += 1
            } else {
                if (consecutiveDay > maxConsecutiveWorkDay) maxConsecutiveWorkDay = consecutiveDay
                consecutiveDay = 0
            }
        })
    })
    if (consecutiveDay > maxConsecutiveWorkDay) maxConsecutiveWorkDay = consecutiveDay

    return {
        countFile,
        countVersion,
        maxConsecutiveWorkDay,
        maxEditFile,
    }
}

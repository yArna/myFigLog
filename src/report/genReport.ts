import { get } from "lodash"
import type { IFilesVersionsResult } from "../core/listAllFIlesAndVersions"
import { createYearCells } from "../core/time/createYearCells"
import { dateFormatDay } from "../core/time/dateFormatDay"
import { IFile, IUser } from "../core/type"
import { IWorkCell } from "./WorkCell"

export interface IReport {
    years: { [year: string]: IReportDataYear }
    fileNameMap: IReportFileNameMap
    userInfo: IUser
    createDate: Date
}

export interface IReportDataYear {
    year: number
    mouths: IWorkCell[][]
    maxCellVersionCount: number
    fileVerLogMap: { [fileKey: string]: number }
}
export type IReportFileNameMap = { [fileKey: string]: { name: string; created_at: string } }

export async function genReport(fileVersionsResult: IFilesVersionsResult) {
    let { yaerCtxMap, fileMap } = await getRepotCoreData(fileVersionsResult )

    let report = {
        years: {},
        fileNameMap: {},
        userInfo: fileVersionsResult.userInfo,
        createDate: new Date(),
    }

    for (const year in yaerCtxMap) {
        let yearCtx = yaerCtxMap[year]
        let maxCellVersionCount = 0

        yearCtx.cells.forEach((cell) => {
            if (cell.versionCount > maxCellVersionCount) maxCellVersionCount = cell.versionCount
        })

        let reportDataYear = {
            year: yearCtx.year,
            mouths: yearCtx.mouths,
            maxCellVersionCount,
            fileVerLogMap: yearCtx.fileVerLogMap,
        }
        report.years[year] = reportDataYear
    }

    for (const key in fileMap) {
        report.fileNameMap[key] = { name: fileMap[key].name, created_at: fileMap[key].created_at }
    }

    return { report, yaerCtxMap, fileMap }
}

export async function getRepotCoreData(fileVersionsResult: IFilesVersionsResult) {
    let yaerCtxMap: { [year: string]: ReturnType<typeof cerateYearCtx> } = {}

    let { versions, files } = fileVersionsResult

    for (const version of versions) {
        let date = new Date(version.created_at)
        let year = date.getFullYear()

        if (!yaerCtxMap[year]) yaerCtxMap[year] = cerateYearCtx(year)
        let yearCtx = yaerCtxMap[year]

        let dateStr = dateFormatDay(date)
        let cell = yearCtx.cellsMap[dateStr]

        if (cell) {
            cell.versionCount++
            if (cell.fileLog[version.file_key]) {
                cell.fileLog[version.file_key]++
            } else {
                cell.fileLog[version.file_key] = 1
            }
        } else {
            console.error("[mFLG]", "genReport", "cell not found by version", { version, dateStr, yearCtx })
        }

        if (yearCtx.fileVerLogMap[version.file_key]) {
            yearCtx.fileVerLogMap[version.file_key]++
        } else {
            yearCtx.fileVerLogMap[version.file_key] = 1
        }
    }

    let fileMap: { [fileKey: string]: IFile } = {}
    for (const file of files) {
        fileMap[file.key] = file
    }

    return { yaerCtxMap, fileMap }

    function cerateYearCtx(year: number) {
        let { cells, mouths } = createYearCells(year)

        let fileVerLogMap: { [fileKey: string]: number } = {}
        let cellsMap: { [dateStr: string]: IWorkCell } = {}

        for (const cell of cells) {
            let dateStr = dateFormatDay(cell.date)
            cellsMap[dateStr] = cell
        }

        let ctx = {
            year,
            cells,
            mouths,
            cellsMap,
            fileVerLogMap,
        }
        return ctx
    }
}

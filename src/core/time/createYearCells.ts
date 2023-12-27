import { IWorkCell, newWorkCell } from "../../report/WorkCell"
 

export interface IYearCells {
    cells: IWorkCell[]
    mouths: IWorkCell[][]
}

export function createYearCells(year: number) {
    let yDate = new Date(year, 0)
    let allDays: Date[] = []

    while (yDate.getFullYear() === year) {
        allDays.push(new Date(yDate))
        yDate.setDate(yDate.getDate() + 1)
    }

    let cells = allDays.map((date) => newWorkCell(date))
    let mouths: IWorkCell[][] = []

    cells.forEach((cell) => {
        let mouth = cell.date.getMonth()
        if (!mouths[mouth]) mouths[mouth] = []
        mouths[mouth].push(cell)
    })

    return { cells, mouths }
}

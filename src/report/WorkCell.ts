export interface IWorkCell {
    date: Date
    versionCount: number
    fileLog: {
        [fileKey: string]: number
    }
}

export function newWorkCell(date: Date): IWorkCell {
    return <IWorkCell>(<any>{
        date: date,
        versionCount: 0,
        fileCount: 0,
        fileLog: {},
    })
}

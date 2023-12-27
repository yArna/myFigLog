export function dateFormatDay(date: Date, timeZone?: string) {
    if (timeZone) {
        date = new Date(date.toLocaleString("zh", { timeZone: timeZone }))
    }

    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    return `${year}-${month}-${day}`
}

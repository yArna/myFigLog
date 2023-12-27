import { dateFormatDay } from "./dateFormatDay"
export function isSameDay(date1: Date, date2: Date): boolean {
    return dateFormatDay(date1) === dateFormatDay(date2)
}

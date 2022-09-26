// return yyyy-MM-dd HH-mm:ss

interface ITime {
  addYear?: number
  addMonth?: number
  addDate?: number
  addHour?: number
  addMinute?: number
  addSecond?: number
}
export const dateNow = (props?: ITime) => {
  const addYear = props?.addYear ?? 0
  const addMonth = props?.addMonth ?? 0
  const addDate = props?.addDate ?? 0
  const addHour = props?.addHour ?? 0
  const addMinute = props?.addMinute ?? 0
  const addSecond = props?.addSecond ?? 0

  const dt = new Date()
  const padL = (nr: number, len = 2, chr = `0`) => `${nr}`.padStart(len, chr)
  const date: string = `${dt.getFullYear() + addYear}-${padL(dt.getMonth() + 1 + addMonth)}-${padL(
    dt.getDate() + addDate
  )}`
  const time: string = `${padL(dt.getHours() + addHour)}:${padL(dt.getMinutes() + addMinute)}:${padL(
    dt.getSeconds() + addSecond
  )}`
  return date + ' ' + time
}

// return yyyy-MM-dd HH-mm:ss

export const dateNow = (props?: number) => {
  const addTime = props ?? 0
  const dt = new Date(Date.now() + addTime ?? 0)
  const padL = (nr: number, len = 2, chr = `0`) => `${nr}`.padStart(len, chr)
  const date: string = `${dt.getFullYear()}-${padL(dt.getMonth() + 1)}-${padL(dt.getDate())}`
  const time: string = `${padL(dt.getHours())}:${padL(dt.getMinutes())}:${padL(dt.getSeconds())}`
  return date + ' ' + time
}

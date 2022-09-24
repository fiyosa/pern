const dt = new Date()
const padL = (nr: number, len = 2, chr = `0`) => `${nr}`.padStart(len, chr)

// return yyyy-MM-dd HH-mm:ss
export const dateNow = () => {
  const date: string = `${dt.getFullYear()}-${padL(dt.getMonth() + 1)}-${padL(dt.getDate())}`
  const time: string = `${padL(dt.getHours())}:${padL(dt.getMinutes())}:${padL(dt.getSeconds())}`
  return date + ' ' + time
}

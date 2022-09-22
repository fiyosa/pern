// 2011-04-11T03:20:30.000Z => 2011-04-11 03:20:30

export const dateFormat = (date: string | Date): string | null => {
  try {
    const data = new Date(date).toISOString().split('.')[0].split('T')
    const result = data[0] + ' ' + data[1]
    return result
  } catch (err) {
    return null
  }
}

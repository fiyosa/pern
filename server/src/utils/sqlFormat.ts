export const insertQuery = (data: any[]): [string, string] => {
  try {
    if (data.length === 0) return ['', '']

    let checkKey: string = Object.keys(data[0]).join(',')
    for (const value of data) {
      if (Object.keys(value).join(',') !== checkKey) return ['', '']
      checkKey = Object.keys(value).join(',')
    }

    const tables = Object.keys(data[0])
    const newTables = tables
      .map((table) => {
        return `"${table}"`
      })
      .join(',')

    const listValue: string[] = []
    for (const value of data) {
      const values = Object.values(value)
      const newValues = values
        .map((value) => {
          if (typeof value === 'string') return `'${value}'`
          return value ?? 'null'
        })
        .join(',')
      listValue.push(`(${newValues})`)
    }

    return [`(${newTables})`, `${listValue.join(',')}`]
  } catch (err: any) {
    return ['', '']
  }
}

export const updateQuery = (data: any): string => {
  try {
    if (Object.keys(data).length === 0) return ''

    let newData: string[] = []
    for (const key in data) {
      if (typeof data[key] === 'string') {
        newData.push(`"${key}" = '${data[key]}'`)
      } else {
        newData.push(`"${key}" = ${data[key] ?? 'null'}`)
      }
    }

    return `${newData.join(',')}`
  } catch (err) {
    return ''
  }
}

import Hashids from 'hashids'
const hashids = new Hashids()

export const encryptId = (data: string): string => {
  try {
    return hashids.encode(data)
  } catch (err) {
    return ''
  }
}

export const decryptId = (data: string): string => {
  try {
    return hashids.decode(data)[0].toString()
  } catch (err) {
    return ''
  }
}

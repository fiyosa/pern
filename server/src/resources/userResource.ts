import { encryptId } from '../utils'

export const userResource = (value: any) => {
  return {
    id: encryptId(value.id || ''),
    email: value.email || null,
    first_name: value.first_name || null,
    last_name: value.last_name || null,
  }
}

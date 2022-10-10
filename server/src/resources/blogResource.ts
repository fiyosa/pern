import { encryptId } from '../utils'

export const blogResource = (value: any) => {
  if (value?.id === null) return null
  return {
    id: encryptId(value?.id) ?? null,
    name: value?.name ?? null,
  }
}

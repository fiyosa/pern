import { encryptId } from '../utils'

export const categoryResource = (value: any) => {
  if (value?.id === null) return null
  return {
    id: encryptId(value?.id) ?? null,
    name: value?.name ?? null,
  }
}

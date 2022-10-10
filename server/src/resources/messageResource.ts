import { dateFormat, encryptId } from '../utils'

export const messageResource = (value: any) => {
  if (value?.id === null) return null
  return {
    id: encryptId(value?.id) ?? null,
    description: value?.description ?? null,
    is_view: value?.is_view ?? null,
    created_at: dateFormat(value?.created_at ?? ''),
  }
}

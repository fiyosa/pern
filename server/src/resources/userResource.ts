import { encryptId } from '../utils'
import { roleResource } from './roleResource'

interface Iprops {
  blog?: any[]
  role?: any
  message?: any[]
}

export const userResource = (value: any, props?: Iprops) => {
  if (value?.id === null) return null
  return {
    id: encryptId(value.id || null),
    email: value.email ?? null,
    first_name: value.first_name ?? null,
    last_name: value.last_name ?? null,
    role: roleResource(props?.role),
    blog: props?.blog,
    message: props?.blog,
  }
}

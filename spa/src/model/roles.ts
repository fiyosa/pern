import { IRoleData } from '.'

export interface IRoles {
  success: boolean
  data?: IRoleData[]
  extra?: any[]
  message: string
}

import { IUserData } from '.'

export interface IUsers {
  success: boolean
  data?: IUserData[]
  extra?: any[]
  message: string
}

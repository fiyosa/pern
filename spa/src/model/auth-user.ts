import { IAuthUserData } from '.'

export interface IAuthUser {
  success: boolean
  data?: IAuthUserData
  message: string
}

import { IMessageData } from './message-data'

export interface IMessages {
  success: boolean
  data?: IMessageData[]
  extra?: any[]
  message: string
}

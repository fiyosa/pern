import { IMessageData, IUserDataBlog } from '.'

export interface IUserData {
  id: string
  first_name: string
  last_name: string
  email: string
  role_id: string
  role_name: string
  blog: IUserDataBlog[]
  message: IMessageData[]
}

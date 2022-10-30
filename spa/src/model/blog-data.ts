import { IMessageData } from './index'

export interface IBlogData {
  id: string
  user_id: string
  user_email: string
  user_first_name: string
  user_last_name: string
  title: string
  excerpt: string
  body?: string
  image: string
  view: number
  published_at: string
  category_id: string
  category_name: string
  message?: IMessageData[]
}

export const BlogDataModel: IBlogData = {
  id: '',
  user_id: '',
  user_email: '',
  user_first_name: '',
  user_last_name: '',
  title: '',
  excerpt: '',
  body: '',
  image: '',
  view: 0,
  published_at: '',
  category_id: '',
  category_name: '',
}

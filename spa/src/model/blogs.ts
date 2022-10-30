import { IBlogData } from '.'

export interface IBlogs {
  success: boolean
  data?: IBlogData[]
  extra?: null | any
  message: string
}

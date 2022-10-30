import { IBlogData } from '.'

export interface IBlog {
  success: boolean
  data?: IBlogData
  message: string
}

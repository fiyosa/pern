import { ICategoryData, ICategoryExtra } from './index'

export interface ICategories {
  success: boolean
  data?: ICategoryData[]
  extra?: ICategoryExtra | null
  message: string
}

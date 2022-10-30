import { IAuthUserData, ICategoryData, IMenuData } from '../../model'

export interface IInitialState {
  loading: boolean
  data: any | IMenuData | ICategoryData[] | IAuthUserData
  status: 'none' | 'success' | 'error'
}

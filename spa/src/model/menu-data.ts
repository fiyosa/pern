import { IMenuRoute } from './index'

export interface IMenuData {
  Public: IMenuRoute[]
  Admin?: IMenuRoute[]
  User?: IMenuRoute[]
}

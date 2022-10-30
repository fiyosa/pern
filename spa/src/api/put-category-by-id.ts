import axios, { AxiosPromise } from 'axios'
import { ICategories } from '../model'
import { handlerResponse, headerAuth } from '../utils'

interface IGetCategories {
  id: string
  category: string
  description: string
}

export const putCategoryById = (props: IGetCategories): AxiosPromise<ICategories> => {
  return axios({
    method: 'put',
    url: `${process.env.REACT_APP_API_URL}/category/${props.id}`,
    headers: headerAuth,
    data: {
      category: props.category,
      description: props.description,
    },
    timeout: 30000,
  })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return handlerResponse(err.response)
    })
}

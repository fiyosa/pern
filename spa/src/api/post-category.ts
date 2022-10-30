import axios, { AxiosPromise } from 'axios'
import { ICategories } from '../model'
import { handlerResponse, headerAuth } from '../utils'

interface IGetCategories {
  category: string
  description: string
}

export const postCategorie = (props: IGetCategories): AxiosPromise<ICategories> => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/category`,
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

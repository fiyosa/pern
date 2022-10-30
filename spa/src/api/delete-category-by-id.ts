import { IResponse } from '../model'
import { handlerResponse, headerAuth } from '../utils'
import axios, { AxiosPromise } from 'axios'

export const deleteCategoryById = (id: string): AxiosPromise<IResponse> => {
  return axios({
    method: 'delete',
    url: `${process.env.REACT_APP_API_URL}/category/${id}`,
    headers: headerAuth,
    timeout: 30000,
  })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return handlerResponse(err.response)
    })
}

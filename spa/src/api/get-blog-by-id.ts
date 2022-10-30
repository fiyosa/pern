import { IBlog } from '../model'
import { handlerResponse, headerAuth, headerPublic } from '../utils'
import axios, { AxiosPromise } from 'axios'

export const getBlogById = (id: string): AxiosPromise<IBlog> => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/auth/blog/${id}`,
    headers: headerPublic,
    data: {},
    timeout: 30000,
  })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return handlerResponse(err.response)
    })
}

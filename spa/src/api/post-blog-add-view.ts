import axios, { AxiosPromise } from 'axios'
import { IResponse } from '../model'
import { handlerResponse, headerPublic } from '../utils'

export const postBlogAddView = (blog_id: string): AxiosPromise<IResponse> => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/auth/blog-view/${blog_id}`,
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

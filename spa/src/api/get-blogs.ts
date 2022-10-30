import { IBlogs } from '../model'
import { handlerResponse, headerAuth, headerPublic } from '../utils'
import axios, { AxiosPromise } from 'axios'

export const getBlogsPublic = (url: string): AxiosPromise<IBlogs> => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/auth/blog${url}`,
    headers: headerPublic,
    timeout: 30000,
  })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return handlerResponse(err.response)
    })
}

export const getBlogsAuth = (url: string): AxiosPromise<IBlogs> => {
  return axios({
    method: 'get',
    url: `${process.env.REACT_APP_API_URL}/blog${url}`,
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

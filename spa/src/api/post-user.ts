import axios, { AxiosPromise } from 'axios'
import { IResponse } from '../model'
import { handlerResponse, headerPublic } from '../utils'

interface IPostUser {
  first_name: string
  last_name: string
  email: string
  password: string
}

export const postUser = (props: IPostUser): AxiosPromise<IResponse> => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/auth/user/create`,
    headers: headerPublic,
    data: {
      first_name: props.first_name,
      last_name: props.last_name,
      email: props.email,
      password: props.password,
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

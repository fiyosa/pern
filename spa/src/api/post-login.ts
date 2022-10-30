import { ILogin } from '../model'
import { handlerResponse } from '../utils/handlerResponse'
import axios, { AxiosPromise } from 'axios'

interface postLogin {
  username: string
  password: string
}

export const postLogin = (props: postLogin): AxiosPromise<ILogin> => {
  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/auth/login`,
    headers: {
      Accept: 'application/json',
    },
    data: {
      username: props.username,
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

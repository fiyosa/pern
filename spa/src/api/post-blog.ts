import {} from '../model'
import { handlerResponse, headerAuth } from '../utils'
import axios, { AxiosPromise } from 'axios'

interface Idata {
  user_id: string
  title: string
  body: string
  category_id: string
  image: File
}

export const postBlog = (data: Idata): AxiosPromise<any> => {
  const newData = new FormData()
  newData.append('user_id', data.user_id)
  newData.append('title', data.title)
  newData.append('body', data.body)
  newData.append('category_id', data.category_id)
  newData.append('image', data.image)

  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/blog`,
    headers: headerAuth,
    data: newData,
    timeout: 30000,
  })
    .then((res) => {
      return res
    })
    .catch((err) => {
      return handlerResponse(err.response)
    })
}

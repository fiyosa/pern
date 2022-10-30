import {} from '../model'
import { handlerResponse, headerAuth } from '../utils'
import axios, { AxiosPromise } from 'axios'

interface Idata {
  blog_id: string
  title: string
  body: string
  category_id: string
  image: File | null
}

export const postBlogById = (data: Idata): AxiosPromise<any> => {
  const newData = new FormData()
  newData.append('title', data.title)
  newData.append('body', data.body)
  newData.append('category_id', data.category_id)
  if (data.image !== null) newData.append('image', data.image)

  return axios({
    method: 'post',
    url: `${process.env.REACT_APP_API_URL}/blog/${data.blog_id}`,
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

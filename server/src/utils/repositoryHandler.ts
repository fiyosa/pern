interface result {
  status: boolean
  message: string | any
}

export const success = (message: any = ''): result => {
  return {
    status: true,
    message,
  }
}

export const error = (err: any): result => {
  return {
    status: false,
    message: 'Something went wrong.',
  }
}

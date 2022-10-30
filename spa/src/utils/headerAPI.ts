export const headerPublic = {
  Accept: 'application/json',
}

export const headerAuth = {
  Accept: 'application/json',
  Authorization: 'Bearer ' + window.localStorage.getItem('token') ?? '',
}

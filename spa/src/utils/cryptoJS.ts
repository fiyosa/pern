import CryptoJS from 'crypto-js'

export const decrypt = (data: string): string => {
  try {
    const key: string = (process.env.REACT_APP__KEY as string).substring(7)
    const encrypted_json = JSON.parse(window.atob(data))
    const encrypted = CryptoJS.AES.decrypt(encrypted_json.value, CryptoJS.enc.Base64.parse(key), {
      iv: CryptoJS.enc.Base64.parse(encrypted_json.iv),
    })
    let decryptData = encrypted.toString(CryptoJS.enc.Utf8)
    return decryptData
  } catch (err) {
    return ''
  }
}

export const encrypt = (data: string): string => {
  try {
    if (data === '') return ''

    let key: any = (process.env.REACT_APP__KEY as string).substring(7)
    let iv: any = CryptoJS.lib.WordArray.random(16)
    key = CryptoJS.enc.Base64.parse(key)
    let options = {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
    let encrypted: any = CryptoJS.AES.encrypt(data, key, options)
    encrypted = encrypted.toString()
    iv = CryptoJS.enc.Base64.stringify(iv)
    let result = {
      iv: iv,
      value: encrypted,
      mac: CryptoJS.HmacSHA256(iv + encrypted, key).toString(),
    }
    let result_final: any = JSON.stringify(result)
    result_final = CryptoJS.enc.Utf8.parse(result_final)
    return CryptoJS.enc.Base64.stringify(result_final)
  } catch (err) {
    return ''
  }
}

import bcrypt from 'bcrypt'

export const hash = async (data: string): Promise<string> => {
  const salt = await bcrypt.genSalt()
  const hastPassword = await bcrypt.hash(data, salt)
  return hastPassword
}

export const compare = async (check: string, value: string): Promise<boolean> => {
  const result = await bcrypt.compare(check, value)
  return result
}

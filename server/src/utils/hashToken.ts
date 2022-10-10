import bcrypt from 'bcrypt'

export const hash = async (data: string): Promise<string> => {
  const salt = await bcrypt.genSalt()
  const hashPassword = await bcrypt.hash(data, salt)
  return hashPassword
}

export const compare = async (check: string, answer: string): Promise<boolean> => {
  const result = await bcrypt.compare(check, answer)
  return result
}

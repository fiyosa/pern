import bcrypt from 'bcrypt'

export const hash = async (data: string) => {
  const salt = await bcrypt.genSalt()
  const hastPassword = await bcrypt.hash(data, salt)
  return hastPassword
}

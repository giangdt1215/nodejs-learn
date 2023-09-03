import * as brcypt from 'bcrypt';

export function encodePassword(rawPassword: string) {
  // if you want to generate salt use brcypt.genSaltSync(); or bcrypt.genSalt()
  const SALT = brcypt.genSaltSync();
  return brcypt.hashSync(rawPassword, SALT);
}

export function comparePassword(rawPassword: string, hashPassword: string) {
  return brcypt.compareSync(rawPassword, hashPassword);
}

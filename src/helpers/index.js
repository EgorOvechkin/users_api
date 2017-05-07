const crypto = require('crypto')

function genRandomString(length) {
  return crypto.randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
}

function genHashPassword(password, salt) {
  const hash = crypto.createHmac('sha512', password)
  hash.update(salt)
  const passwordHash = hash.digest('hex')
  return { salt, passwordHash }
}

function saltHashPassword(password) {
  const salt = genRandomString(16)
  return genHashPassword(password, salt)
}

module.exports = {
  genHashPassword,
  saltHashPassword
}

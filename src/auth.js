const ObjectId = require('mongodb').ObjectID
const { read } = require('./profiles')
const { genHashPassword } = require('./helpers')

async function auth(collections, { nickname = '', password = '' }) {
  let code = null
  try {
    if (!nickname) throw new Error('Nickname is required')
    const profile = await collections.profiles.findOne({ nickname })
    if (!profile) {
      code = 404
      throw new Error('Not found')
    }
    const { passwordHash, salt } = profile.passwordData
    if (passwordHash == genHashPassword(password, salt).passwordHash) {
      console.log('Auth is success')
      return {
        code: 200,
        message: 'OK'
      }
    }
    throw new Error('Password is not correct')
  } catch (err) {
    console.log(new Error(err))
    return {
      code: code || 500,
      message: err.message
    }
  }
}

module.exports = auth

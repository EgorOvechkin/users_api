const { saltHashPassword } = require('../helpers')
const read = require('./read.js')

async function create(collections, profile) {
  const defaultProfile = {
    firstName: 'UnknowFirstName',
    middleName: 'UnknowMiddleName',
    lastName: 'UnknowLastName',
    country: null
  }
  const {
    firstName,
    middleName,
    nickname,
    lastName,
    password,
    country
  } = Object.assign(defaultProfile, profile)
  try {
    if (!password || !nickname) {
      throw new Error('Password and nickname are required')
    }
    const response = await read(collections, { nickname })
    if (response.data) {
      throw new Error(`User with nickname: ${nickname} is already exist`)
    }
    const passwordData = password ? saltHashPassword(password) : null
    const res = await collections.profiles.insertOne({
      name: {
        firstName,
        middleName,
        lastName
      },
      passwordData,
      country,
      nickname
    })
    if (res.result.ok === 1 && res.result.n === 1) {
      console.log(`Profile with id: ${res.insertedId} was created`)
      return {
        code: 200,
        message: 'OK'
      }
    }
    throw new Error('Not inserted')
  } catch (err) {
    console.log(new Error(err))
    return {
      code: 500,
      message: err.message
    }
  }
}

module.exports = create

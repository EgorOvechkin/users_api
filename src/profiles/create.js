const { saltHashPassword } = require('../helpers')

async function create(collections, profile) {
  const defaultProfile = {
    firstName: 'UnknowFirstName',
    middleName: 'UnknowMiddleName',
    lastName: 'UnknowLastName',
    password: '',
    country: null
  }
  const {
    firstName,
    middleName,
    lastName,
    password,
    country
  } = Object.assign(defaultProfile, profile)
  const passwordData = password ? saltHashPassword(password) : null
  try {
    const res = await collections.profiles.insertOne({
      name: {
        firstName,
        middleName,
        lastName
      },
      passwordData,
      country
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

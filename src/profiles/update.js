const ObjectId = require('mongodb').ObjectID
const auth = require('../auth.js')
const { saltHashPassword } = require('../helpers')

function filterUpdateOptions(update) {
  const filteredUpdate = {}
  for (let key in update) {
    if ([ 'firstName', 'middleName', 'lastName' ].some(item => item === key)) {
      filteredUpdate[`name.${key}`] = update[key]
    } else if (key === 'password') {
      filteredUpdate.passwordData = saltHashPassword(update.password)
    } else if (key != 'passwordData') {
      filteredUpdate[key] = update[key]
    }
  }
  return filteredUpdate
}

async function update(collections, account, update) {
  try {
    if (Object.keys(update).length === 0) throw new Error('Nothing to update')
    if (!account) throw new Error('Account is required')
    const authResult = await auth(collections, account)
    if (authResult.code !== 200) {
      return {
        authResult
      }
    }
    const res = await collections.profiles.updateOne(
      { nickname: account.nickname },
      { $set: filterUpdateOptions(update) }
    )
    if (res.result.ok === 1 && res.result.nModified === 1 && res.result.n === 1) {
      console.log(`Profile with nickname: ${account.nickname} was updated`)
      return {
        code: 200,
        message: 'OK'
      }
    }
    if (res.result.nModified === 0 && res.result.n === 1) {
      throw new Error('Not updated')
    }
    throw new Error('Not found')
  } catch (err) {
    console.log(new Error(err))
    return {
      code: 500,
      message: err.message
    }
  }
}

module.exports = update

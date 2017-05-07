const ObjectId = require('mongodb').ObjectID

function filterUpdateOptions(update) {
  const filteredUpdate = {}
  for (let key in update) {
    if ([ 'firstName', 'middleName', 'lastName' ].some(item => item === key)) {
      filteredUpdate[`name.${key}`] = update[key]
    } else if (key != 'passwordData') {
      filteredUpdate[key] = update[key]
    }
  }
  return filteredUpdate
}

async function update(collections, profileId, update) {
  try {
    const res = await collections.profiles.updateOne(
      { _id: ObjectId(profileId) },
      { $set: filterUpdateOptions(update) }
    )
    console.log(res)
    if (res.result.ok === 1 && res.result.nModified === 1 && res.result.n === 1) {
      console.log(`Profile with id: ${profileId} was updated`)
      return {
        code: 200,
        message: 'OK'
      }
    }
    if (res.result.nModified === 0 && res.result.n === 1) {
      throw new Error('Not updated')
    }
    throw new Error('Not found')
    // console.log(res)
  } catch (err) {
    console.log(new Error(err))
    return {
      code: 500,
      message: err.message
    }
  }
}

module.exports = update

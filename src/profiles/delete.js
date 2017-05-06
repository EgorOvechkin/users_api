const ObjectId = require('mongodb').ObjectID

async function remove(collections, profileId) {
  try {
    const res = await collections.profiles.removeOne(
      { _id: ObjectId(profileId) }
    )
    if (res.result.ok === 1 && res.result.n === 1) {
      console.log(`Profile with id: ${profileId} was deleted`)
      return {
        code: 200,
        message: 'OK'
      }
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

module.exports = remove

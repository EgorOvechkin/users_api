const ObjectId = require('mongodb').ObjectID

async function read(collections, profileId) {
  try {
    const res = await collections.profiles.findOne(
      { _id: ObjectId(profileId) }
    )
    if (res === null) {
      throw new Error('Not found')
    }
    console.log(`Profile was read: ${JSON.stringify(res)}`)
    return {
      code: 200,
      message: 'OK',
      data: res
    }
  } catch (err) {
    console.log(new Error(err))
    return {
      code: 500,
      message: err.message
    }
  }
}

module.exports = read

const ObjectId = require('mongodb').ObjectID

async function read(collections, profileId) {
  try {
    const res = await collections.profiles.findOne(
      { _id: ObjectId(profileId) }
    )
    if (res === null) {
      throw new Error('Not found')
    }
    const {
      _id,
      name,
      country
    } = res
    console.log(`Profile was read: ${JSON.stringify({ _id, name, country })}`)
    return {
      code: 200,
      message: 'OK',
      data: { _id, name, country }
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

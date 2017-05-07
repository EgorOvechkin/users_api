const ObjectId = require('mongodb').ObjectID

async function read(collections, { profileId, nickname }) {
  let code = null
  try {
    console.log(nickname)
    if (!profileId && !nickname) {
      throw new Error('no prfileID and nickname')
    }
    const res = await collections.profiles.findOne(
      profileId ? { _id: ObjectId(profileId) } : { nickname }
    )
    if (res === null) {
      code = 404
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
      code: code || 500,
      message: err.message
    }
  }
}

module.exports = read

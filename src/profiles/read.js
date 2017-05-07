const ObjectId = require('mongodb').ObjectID

async function read(collections, accountData/*{ profileId, nickname }*/) {
  let code = null
  try {
    const { profileId } = accountData
    if (!accountData.profileId && !accountData.nickname) {
      throw new Error('no prfileID and nickname')
    }
    const res = await collections.profiles.findOne(
      profileId
      ? { _id: ObjectId(profileId) }
      : { nickname: accountData.nickname }
    )
    if (res === null) {
      code = 404
      throw new Error('Not found')
    }
    const {
      _id,
      name,
      country,
      nickname
    } = res
    console.log(`Profile was read: ${JSON.stringify({ _id, name, country, nickname })}`)
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

const ObjectId = require('mongodb').ObjectID

async function update(collections, { nickname, password }) {
  try {

  } catch (err) {
    console.log(new Error(err))
    return {
      code: 500,
      message: err.message
    }
  }
}

module.exports = update

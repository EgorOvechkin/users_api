require('dotenv').load()

module.exports = {
  host: process.env.MONGODB_HOST || 'localhost',
  port: process.env.MONGODB_PORT || 27017,
  name: process.env.MONGODB_NAME || 'users_api'
}
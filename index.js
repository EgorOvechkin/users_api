const io = require('socket.io')(8080)
const MongoClient = require('mongodb').MongoClient
const {
  host,
  name,
  port
} = require('./config.js')

async function init() {
  try {
    const mongodbUrl = `mongodb://${host}:${port}/${name}`
    const mongo = await MongoClient.connect(mongodbUrl)
    const profiles = mongo.collection('Profiles')
    const c = await profiles.count()
    console.log(c)
  } catch (err) {
    throw new Error(err)
  }
}

init()

io.on('connection', socket => console.log('connect'))
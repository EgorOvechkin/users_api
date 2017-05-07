const io = require('socket.io')(8080)
const MongoClient = require('mongodb').MongoClient
const { host, name, port } = require('./config.js')
const { create, remove, read, update } = require('./src/profiles/')
const _auth = require('./src/auth.js')

async function init() {
  try {
    const mongodbUrl = `mongodb://${host}:${port}/${name}`
    const mongo = await MongoClient.connect(mongodbUrl)
    const collections = {
      countries: mongo.collection('Countries'),
      profiles: mongo.collection('Profiles')
    }
    const createProfile = create.bind(null, collections)
    const deleteProfile = remove.bind(null, collections)
    const getProfile = read.bind(null, collections)
    const updateProfile = update.bind(null, collections)
    const auth = _auth.bind(null, collections)
    io.on('connection', socket => {
      console.log('connect')
      socket.on('add_profile', async function(data) {
        const response = await createProfile(data)
        socket.emit('response', response)
      })
      socket.on('get_profile', async function(id) {
        const response = await getProfile(id)
        socket.emit('response', response)
      })
      socket.on('delete_profile', async function(id) {
        const response = await deleteProfile(id)
        socket.emit('response', response)
      })
      socket.on('update_profile', async function({ account, update }) {
        const response = await updateProfile(account, update)
        socket.emit('response', response)
      })
      socket.on('auth', async function({ nickname, password }) {
        const response = await auth({ nickname, password })
        socket.emit('response', response)
      })
    })
  } catch (err) {
    console.log(new Error(err))
  }
}

init()


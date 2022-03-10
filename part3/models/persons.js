const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name Required'], minLength: 3 },
  number: { type: String,
    validate:{
      validator: (v) => /\d{2,3}?-\d{5,}$/.test(v)
    },
    required: [true, 'Number Required'],
    minLength: [9, 'Minimum Length 8 digits']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

personSchema.plugin(uniqueValidator)
module.exports = mongoose.model('Person', personSchema)
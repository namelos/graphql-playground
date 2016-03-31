import mongoose, { Schema } from 'mongoose'

mongoose.connect('mongodb://localhost/test')

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))

db.once('open', () => {
  console.log('connected')
})

const kittySchema = Schema({
  name: String
})

kittySchema.methods.speak = function() {
  var greeting = this.name ? 'Meow name is ' + this.name : 'I do not have a name'
  console.log(greeting)
}

const Kitten = mongoose.model('Kitten', kittySchema)

const fluffy = new Kitten({ name: 'fluffy' })

fluffy.save((err, fluffy) => {
  if (err) return console.error(err)
  fluffy.speak()
})

Kitten.find((err, kittens) => {
  if (err) return console.error(err)
  console.log(kittens)
})
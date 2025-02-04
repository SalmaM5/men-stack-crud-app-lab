const mongoose = require('mongoose')

const clothesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: String,
})

const Clothe = mongoose.model('Clothe', clothesSchema)
module.exports = Clothe;
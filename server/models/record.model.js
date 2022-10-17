const mongoose = require("mongoose")

const RecordObject = {
  name: String,
  last: String,
  buy: String,
  sell: String,
  volume: String,
  base_unit: String
};

const RecordSchema = new mongoose.Schema({
  records: [RecordObject]
}, {
  timestamps: true,
})

const Record = mongoose.model('Record', RecordSchema, 'records')

module.exports = { Record };
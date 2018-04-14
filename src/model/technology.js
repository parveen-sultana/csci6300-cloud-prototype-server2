import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const technologySchema = new Schema({
  name: {type: String}
});


module.exports = mongoose.model('Technology', technologySchema, 'technologies');

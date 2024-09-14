const mongoose = require('mongoose');

const formDetailsSchema = new mongoose.Schema({
  formData: { type: Object, required: true },
  isDeleted:{type: Boolean, default: false}
});

module.exports = mongoose.model('formDetails', formDetailsSchema);
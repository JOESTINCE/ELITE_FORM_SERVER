const mongoose = require('mongoose');

const formResponseDetailsSchema = new mongoose.Schema({
  emailId: String,
  formResponse: { type: Object, required: true },
  isDeleted: { type: Boolean, default: false }
});

module.exports = mongoose.model('formResponseDetails', formResponseDetailsSchema);
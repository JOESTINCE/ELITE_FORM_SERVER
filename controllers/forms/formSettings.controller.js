const router = require('express').Router();
const FormSettingsService = require('../../services/forms/formSettings.service');

const saveFormSettings = async function(req, res){
  try {
    const data = await FormSettingsService.saveFormSettings(req?.body);
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(422).json(err.message);
  }
}


router.post('/', saveFormSettings);

module.exports = { router }
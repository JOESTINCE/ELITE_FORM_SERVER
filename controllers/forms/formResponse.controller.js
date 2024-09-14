const FormResponseService = require('../../services/forms/formResponse.service');
const router = require('express').Router();

const saveFormResponse = async function(req, res){
  try {
    const data = await FormResponseService.saveFormResponse(req?.body);
    if(data){
      res.status(201).json({ success: true, data: data });
    }
  } catch (err) {
    return res.status(422).json(err?.message);
  }
}

const getAllFormResponse = async function(req, res){
  try {
    const data = await FormResponseService.getAllFormResponse(req?.query);
    res.status(201).json({ success: true, data: data });
  } catch (err) {
    return res.status(422).json(err?.message);
  }
}

router.post('/', saveFormResponse);
router.get('/', getAllFormResponse)

module.exports = {router}
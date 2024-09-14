const router = require('express').Router();
const FormService = require('../../services/forms/forms.service');
const passport = require('passport');
const createform = async function(req, res){
  try{
    const createForm = await FormService.createForm(req?.body);
    if (createForm) {
      res.status(201).json({ success: true, data: createForm });
    }
  }
  catch(error){
    if(error){
      return res.status(422).json(error.message);
    }
  }
}

const getAllForms = async function(req, res){
  try {
    const data = await FormService.getAllForms(req?.query);
    if(data){
      res.status(200).json({ success: true, data: data });
    }
  } catch (err) {
    return res.status(422).json(err.message);

  }
}

const deleteForms = async function(req, res){
  try {
      const data = await FormService.deleteForm(req?.query);
      if(data){
        res.status(200).json({ success: true, data: data });
      }
  } catch (err) {
    return res.status(422).json(err.message);

  }
}

const getOneForm = async function(req, res){
  try {
    const data = await FormService.getOneForm(req?.params?.id);
    res.status(200).json({ success: true, data: data });
  } catch (err) {
    return res.status(422).json(err.message);
  }
}
const updateForm = async function(req, res){
  try {
    const data = await FormService.updateForm(req?.body);
    if(data){
      res.status(200).json({ success: true, data: data });
    }
  } catch (err) {
    return res.status(422).json(err.message);
  }
}
router.post('/',  createform);
router.get('/',  getAllForms);
router.get('/:id', getOneForm);
router.delete('/', deleteForms);
router.put('/', updateForm);
module.exports = {router};
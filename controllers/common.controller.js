const CommonService = require('../services/common.service');
const router = require('express').Router();

const checkEmailDuplication = async function(req, res){
  try {
    const data = await CommonService.checkEmailDuplication(req?.query);
    if(data){
      res.status(200).json({ success: true, isDuplicate: true });

    }
    else{
      res.status(200).json({ success: true, isDuplicate: false });

    }
  } catch (err) {
    return res.status(422).json(err.message);

  }
}

router.get('/duplicate-email', checkEmailDuplication);

module.exports = {router}
const router = require('express').Router();
const DashboardService = require('../../services/dashboard/dashboard.service');

const getDashboardDetails = async function(req, res){
  try {
    const data = await DashboardService.getDashboardDetails(req?.query);
    if(data){
      res.status(201).json({ success: true, data: data });

    }
  } catch (err) {
    return res.status(422).json(err?.message);

  }
}

router.get('/', getDashboardDetails);

module.exports = {router}
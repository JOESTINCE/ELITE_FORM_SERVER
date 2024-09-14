const Forms = require('../../models').forms;
const FormResponse = require('../../models').formResponse;


const getDashboardDetails = async function(params){
  try {
    const forms = await Forms.count({
      where:{
        userId: params?.userId,
        isDeleted: false
      }
    })
    if(forms){
      const formResponse = await FormResponse.count({
        where:{
          userId: params?.userId,
          isDeleted: false
        }
      });
      if (formResponse){
        return {
          formsCreated: forms,
          formsSubmitted: formResponse
        }
      }
    }
    else{
      return {
        formsCreated: 0,
        formsSubmitted: 0
      }
    }
  } catch (err) {
    throw new Error(err?.message);
  }
}
module.exports.getDashboardDetails = getDashboardDetails;
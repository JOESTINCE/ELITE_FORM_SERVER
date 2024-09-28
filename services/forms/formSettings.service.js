const FormSettings = require('../../models').formSettings;

const saveFormSettings = async function(body){
  try {
    const createFormSettings = await FormSettings.findOrCreate({
      defaults: body,
      where:{
        formDetailsId: body?.formDetailsId,
        userId: body?.userId,
        isDeleted: false
      }
    })
    if(createFormSettings?.[1]){
      return createFormSettings
    }
    else{
      const updateFormSettings = await FormSettings.update(
        body,
        {
          where:{
            isDeleted: false,
            userId: body?.userId,
            formDetailsId: body?.formDetailsId
          }
        }
      )
      if(updateFormSettings){
        return updateFormSettings
      }
    }
  } catch (err) {
    throw new Error(err?.message);
  }
}
module.exports.saveFormSettings = saveFormSettings;
const Forms = require('../../models').forms;
const FormResponse = require('../../models').formResponse;
const FormDetails = require('../../mongoDbModels/formDetails');
const FormResponseDetails = require('../../mongoDbModels/formResponseDetails');

const saveFormResponse = async function(body){
  try {
    if(body?.formDetailsId){
      const formDetails = await Forms.findOne({
        where:{
          formDetailsId: body?.formDetailsId,
          isDeleted: false
        }
      });
      if(formDetails){
        const createFormResponseInstance = new FormResponseDetails({ formResponse: body?.formResponse, isDeleted: false });
        if(createFormResponseInstance){
          const createForm = await createFormResponseInstance?.save();
          if(createForm){
            const createFormResponse = await FormResponse.create({
              title: formDetails?.title,
              description: formDetails?.description,
              formId: formDetails?.id,
              formDetailsId: formDetails?.formDetailsId,
              formResponseDetailsId: createForm?._id?.toString(),
              userId: formDetails?.userId
            });
            if(createFormResponse){
              return createFormResponse;
            }
          }
        }
      }
    }
  } catch (err) {
    throw new Error(err?.message);
  }
}
module.exports.saveFormResponse = saveFormResponse;

const getAllFormResponse = async function(query){
  try {
    const data = await Forms.findAndCountAll({
      where:{
        userId: query?.userId,
        isDeleted: false
      },
      include:[{
        model: FormResponse,
        where:{
          isDeleted: false
        },
        required: false 
      }],
      limit: query?.limit,
      offset: query?.offset
    })
    return data;
  } catch (err) {
     throw new Error(err?.message)
  }
}
module.exports.getAllFormResponse = getAllFormResponse;
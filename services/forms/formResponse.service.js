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
            console.log(formDetails)
            const createFormResponse = await FormResponse.create({
              title: formDetails?.title,
              description: formDetails?.description,
              emailId: body?.emailId,
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

const getOneFormResponse = async function (id) {
  try {
    const formResponse = await FormResponse.findOne({
      where:{
        formResponseDetailsId: id,
        isDeleted: false
      }
    })
    if(formResponse){
      const formDetails = await FormResponseDetails.findOne({ _id: id, isDeleted: false });
      if (formDetails) {
        formDetails['formResponse']['title'] = formResponse?.title;
        formDetails['formResponse']['description'] = formResponse?.description;
        console.log(formDetails);
        return formDetails;
      }
    }
   
  } catch (err) {
    throw new Error(err?.message);
  }
}
module.exports.getOneFormResponse = getOneFormResponse;

module.exports.getAllFormResponse = getAllFormResponse;
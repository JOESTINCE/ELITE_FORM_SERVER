const FormDetails = require('../../mongoDbModels/formDetails');
const Forms = require('../../models').forms;


const createForm = async function (body) {
  try {
    // const createFormDetails = await FormDetails.create({ formData: body, isDeleted: false })
    // if (createFormDetails) {
      const formDetailsInstance = new FormDetails({ formData: body, isDeleted: false })
      if (formDetailsInstance) {
        const saveFormDetails = await formDetailsInstance.save();
        if (saveFormDetails) {
          const createFormData = await Forms.create({
            title: body?.title,
            description: body?.description,
            formDetailsId: saveFormDetails?._id?.toString(),
            userId: body?.userId
          })
          if (createFormData) {
            return createFormData;
          }
        }
      }
    // }
  } catch (err) {
    throw new Error(err.message)
  }
}
module.exports.createForm = createForm;

const getAllForms = async function(query){
  try {
    const data = await Forms.findAndCountAll({
      where: {
        userId: query?.userId,
        isDeleted: false
      },
      limit: query?.limit,
      offset: query?.offset,
      order:[['id', 'DESC']]
    })
    if(data){
      return data;
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
module.exports.getAllForms = getAllForms;

const deleteForm = async function(query){
  try {
    const formDetails = await Forms.findOne({
      where:{
        id: query?.id,
        isDeleted: false
      }
    })
    if(formDetails?.formDetailsId){
      const detailsDeletion = await FormDetails.findByIdAndUpdate(
        formDetails?.formDetailsId?.toString(),
        {isDeleted: true},
        {new: true}
      )
      if(detailsDeletion){
        const formDeletion = await Forms.update({
          isDeleted: true
        },
      {
        where:{
          id: query?.id,
          isDeleted: false
        }
      })
      if(formDeletion){
        return formDeletion;
      }
      }
    }

  } catch (err) {
      throw new Error(err?.message);
  }
}
module.exports.deleteForm = deleteForm;

const getOneForm = async function(id){
  try {
    const formDetails = await FormDetails.findOne({_id: id, isDeleted: false});
    if(formDetails){
      return formDetails;
    }
  } catch (err) {
    throw new Error(err?.message);
  }
}
module.exports.getOneForm = getOneForm;

const updateForm = async function(body){
try {
  const formDetails = await Forms.findOne({
    where:{
      formDetailsId: body?.formId
    },
    attributes:['id']
  })
  if(formDetails?.id){
    const formDetailsUpdation = await FormDetails.updateOne(
      { _id: body?.formId },
      { $set: { formData: body?.formData } });
    if (formDetailsUpdation) {
      const formUpdation = await Forms.update({
        title: body?.formData?.title,
        description: body?.formData?.description
      },
        {
          where: {
            id: formDetails?.id
          }
        })
      if(formUpdation){
        return formUpdation;
      }
    }
  }
 
} catch (err) {
  throw new Error(err?.message);
}
}
module.exports.updateForm = updateForm;

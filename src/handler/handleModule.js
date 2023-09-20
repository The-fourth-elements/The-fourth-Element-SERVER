const Module = require('../models/Module');


async function handleCreateModule(request){

if(request){
    const module = await Module.create({...request})
    if(module._id) return module._id
}
    return false
}


async function handleGetModule(id){
    if(id)
    return await Module.findOne({_id:id})
    else 
    return false
}


async function handleUpdateModule(props){
     const {id} = props
     const response = await Module.findByIdAndUpdate(id,props, {new: true});
     return response
}


async function handleGetAllModule(){
    try { 
       const Modules = await Module.find({})
       if(Modules) return Modules
       throw Error('Modules not found')
    } catch (error) {
        return error
    }
}

async function handleDeleteModule(id){
    try {
       const moduleDelete =  await Module.deleteOne({_id:id})
     if(moduleDelete) return moduleDelete 
    } catch (error) {
        return error
    }
}


module.exports = {
    handleGetAllModule,
    handleUpdateModule,
    handleCreateModule,
    handleGetModule,
    handleDeleteModule
}
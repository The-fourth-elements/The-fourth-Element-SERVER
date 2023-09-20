const Module = require('../models');


function handleCreateModule(request){
if(request){
    const module = Module.create({request})
    if(module._id) return module._id
}
    return false
}


function handleGetModule(id){
    if(id)
    return Module.findOne({_id:id})
    else 
    return false
}


function handleUpdateModule(props){
     const {id} = props
     const response = Module.findByIdAndUpdate(id,props, {new: true});
     console.log(response)
     return true
}


function handleGetAllModule(){
    try { 
       const Modules = Module.find({})
       if(Modules) return Modules
       throw Error('Modules not found')
    } catch (error) {
        return error
    }
}

function handleDeleteModule(id){
    try {
       const moduleDelete =  Module.delete({_id:id})
     if(moduleDelete) console.log(moduleDelete)
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
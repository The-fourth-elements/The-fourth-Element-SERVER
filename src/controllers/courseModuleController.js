
const { decriptToken } = require('../services/token');
const { handleUserDB } = require('../handler/handleUserDB')
const {handleCreateModule, handleGetModule, handleGetAllModule,handleDeleteModule,handleUpdateModule} = require('../handler/handleModule')

function courseModuleController(req,res){
try {
     const userId = decriptToken(req.cookies.jwt)
    if(!userId?.error) {
    const currentUser = handleUserDB(userId);
     if(currentUser.role === 'administrador'){
        const newModule = handleCreateModule(req.body)
        if(newModule)  return res.status(200).json({action:'successful',message:'module created successfully'});
     }
    } throw Error('token is invalid')
 } catch (error) {
    res.status(400).json({access:'denied', message:error.message})
 }
}

function getCourseModuleController(req,res){
 try {
    const userId = decriptToken(req.cookies.jwt);
    if(!userId?.error){
        const currentUser = handleUserDB(userId);
        if(!currentUser.role ==='visitante'){
            const {id} = req.body;
            const module = handleGetModule(id)

            if(module) return res.status(200).json(module)
            throw Error('module not found')
        }
    }
 } catch (error) {
        res.status(400).json({action:'fail', message:error.message})
 }
}

function getAllCourseModuleController(req,res){
    try {
        const userId = decriptToken(req.cookies.jwt);
        if(!userId?.error){
            const currentUser = handleUserDB(userId);
            if(currentUser.role !== 'visitante'){
                const modules = handleGetAllModule()
                if(modules) return res.status(200).json(modules)
                throw Error('Module is Empty')
            }
        }
     } catch (error) {
            res.status(400).json({action:'fail', message:error.message})
     }
}


function deleteCourseModuleController(req,res){
    try {
        const userId = decriptToken(req.cookies.jwt);
        if(!userId?.error){
            const currentUser = handleUserDB(userId);
            if(currentUser.role !=='visitante'){
                const {id} = req.body;
                const module = handleDeleteModule(id)
    
                if(module) return res.status(200).json(module)
                throw Error('module not found')
            }
        }
     } catch (error) {
            res.status(400).json({action:'fail', message:error.message})
     }
}

function updateCourseModuleController(req,res){
    try {
        const userId = decriptToken(req.cookies.jwt);
        if(!userId?.error){
            const currentUser = handleUserDB(userId);
            if(currentUser.role !=='visitante'){
                const module = handleUpdateModule(req.body)
                if(module) return res.status(200).json(module)
                throw Error('module not found')
            }
        }
     } catch (error) {
            res.status(400).json({action:'fail', message:error.message})
     }
}

module.exports = {
    courseModuleController,
    getCourseModuleController,
    getAllCourseModuleController,
    updateCourseModuleController,
    deleteCourseModuleController
}

const { decriptToken } = require('../services/token');
const { handleUserDB } = require('../handler/handleUserDB')
const {handleCreateModule, handleGetModule, handleGetAllModule,handleDeleteModule,handleUpdateModule} = require('../handler/handleModule')

async function courseModuleController(req,res){
try {
     const userId = decriptToken(req.cookies.jwt).data
    if(!userId?.error) {
    const currentUser = await handleUserDB(userId);
    console.log(userId)
     if(currentUser.role === 1){
        const newModule = await handleCreateModule(req.body)
        console.log(newModule)
        if(newModule)  return res.status(200).json({action:'successful',message:'module created successfully'});
     }
    } throw Error('token is invalid')
 } catch (error) {
    res.status(400).json({access:'denied', message:error.message})
 }
}

async function getCourseModuleController(req,res){
 try {
    const userId = decriptToken(req.cookies.jwt).data;
    console.log(userId)
    if(!userId?.error){
        const currentUser = await handleUserDB(userId);
        if(currentUser.role === 1){
            const {id} = req.query;
            console.log(id)
            const module = await handleGetModule(id)

            if(module) return res.status(200).json(module)
            throw Error('module not found')
        }
    }
 } catch (error) {
        res.status(400).json({action:'fail', message:error.message})
 }
}

async function getAllCourseModuleController(req,res){
    try {
        const userId = decriptToken(req.cookies.jwt).data;
        if(!userId?.error){
            const currentUser = await handleUserDB(userId);
            if(currentUser.role === 1){
                const modules = await handleGetAllModule()
                if(modules) return res.status(200).json(modules)
                throw Error('Module is Empty')
            }
        }
     } catch (error) {
            res.status(400).json({action:'fail', message:error.message})
     }
}


async function deleteCourseModuleController(req,res){
    try {
        const userId = decriptToken(req.cookies.jwt).data;
        if(!userId?.error){
            const currentUser = await handleUserDB(userId);
            if(currentUser.role ===1){
                const {id} = req.body;
                const module = await handleDeleteModule(id)
    
                if(module) return res.status(200).json(module)
                throw Error('module not found')
            }
        }
     } catch (error) {
            res.status(400).json({action:'fail', message:error.message})
     }
}

async function updateCourseModuleController(req,res){
    try {
        const userId = decriptToken(req.cookies.jwt).data;
        if(!userId?.error){
            const currentUser = await handleUserDB(userId);
            if(currentUser.role ===1){
                const module = await handleUpdateModule(req.body)
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
function getNextProgressModule(modules, index) {
    try {

        const nextModule = {
            module: modules[index].name,
            moduleId: modules[index]._id,
            classes: [
                {
                    name: modules[index].classModule[0].name,
                    classId: modules[index].classModule[0]._id,
                    approved: false,
                    approvedDate: null
                }
            ]
        }
        return nextModule
    } catch (error) {
        console.log(error)
    }
}

module.exports = getNextProgressModule
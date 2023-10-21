function getNextProgressClass(modules, moduleIndex, classIndex) {
    try {
        const nextClass = {
            name: modules[moduleIndex].classModule[classIndex || 0].name,
            classId: modules[moduleIndex].classModule[classIndex || 0]._id,
            approved: false,
            approvedDate: null,
        }
        return nextClass
    } catch (error) {
        return error
    }
}

module.exports = getNextProgressClass
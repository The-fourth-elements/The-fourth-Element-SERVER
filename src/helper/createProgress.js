const Module = require("../models/Module");

async function createProgress(existingProgress) {
    try {
        const modules = await Module.find().populate('classModule')

        if (!existingProgress) {
            let currentDate = new Date();
            const progress = modules.map((module, moduleIndex) => ({
                module: module.name,
                moduleId: module._id,
                isApproved: false,
                classes: module.classModule.map((c, classIndex) => {
                    let newDate = new Date(currentDate);

                    if (moduleIndex === 0 && classIndex === 0) {
                        newDate = new Date(currentDate);
                    } else {
                        newDate.setDate(newDate.getDate() + 1);
                        while (newDate.getDay() === 0 || newDate.getDay() === 6) {
                            newDate.setDate(newDate.getDate() + 1);
                        }
                    }
                    currentDate = newDate
                    return {
                        name: c.name,
                        classId: c._id,
                        approved: false,
                        approvedDate: null,
                        unlockDate: newDate
                    }
                })

            }));

            return progress

        } else {
            modules.forEach((module, moduleIndex) => {
                if (!existingProgress.modules[moduleIndex]) {
                    existingProgress.modules[moduleIndex] = {
                        module: module.name,
                        moduleId: module._id,
                        classes: []
                    };
                }
                module.classModule.forEach((clase, classIndex) => {
                    if (classIndex >= existingProgress.modules[moduleIndex].classes.length) {
                        if (!existingProgress.modules[moduleIndex].classes[classIndex]) {
                            existingProgress.modules[moduleIndex].classes.push({
                                name: clase.name,
                                classId: clase._id,
                                approved: false,
                                approvedDate: null,
                                unlockDate: null,
                            })
                        }
                    }
                })
            })

            let firstDate = existingProgress.modules[0].classes[0].unlockDate
            let currentDate = new Date(firstDate)
            existingProgress.modules.map((module, moduleIndex) => {
                module.classes.map((c, classIndex) => {
                    let newDate = new Date(currentDate);

                    if (moduleIndex === 0 && classIndex === 0) {
                        newDate = new Date(currentDate);
                    } else {
                        newDate.setDate(newDate.getDate() + 1);
                        while (newDate.getDay() === 0 || newDate.getDay() === 6) {
                            newDate.setDate(newDate.getDate() + 1);
                        }
                    }
                    currentDate = newDate
                    c.unlockDate = newDate
                })
            })

            return existingProgress;
        }
    } catch (error) {
        return error
    }
}

module.exports = createProgress;
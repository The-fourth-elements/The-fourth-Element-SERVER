const Class = require("../../models/Class");

async function createClass(req, res, next) {
    try {
        console.log(req.body)
        const { name, description } = req.body
        if (!name || !description) throw Error("Faltan datos")
        const newClass = await Class.create({name, description})
        if (newClass) res.status(201).json(newClass)
    } catch (error) {
        next({ message: error.message, statusCode: 400 });
    }
}

module.exports = createClass
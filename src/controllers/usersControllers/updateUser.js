const findOrCreateCity = require("../../handler/dataBase/findOrCreateCity");
const findOrCreateNation = require("../../handler/dataBase/findOrCreateNation");
const findOrCreateSport = require("../../handler/dataBase/findOrCreateSport");
const { Users } = require("../../models/Users");
const { encrypt } = require("../../services/crypt");
const cloudinary = require('cloudinary');

async function updateUser(req, res, next){
    try {
        const { id } = req.body;
        if(!id) throw Error('Ingrese un id.');
        const { body } = req;
        if(!body) throw Error('Faltan datos.');
        if(body.hasOwnProperty("sport")){
            body.sport = await findOrCreateSport(body.sport);
        }
        if (body.hasOwnProperty("nation")) {
            body.nation = await findOrCreateNation(body.nation);
        }
        if(body.hasOwnProperty("city")){
            body.city = await findOrCreateCity(body.city);
        }
        if(body.hasOwnProperty("password")){
            body.password = await encrypt(body.password);
        }
        if(body.hasOwnProperty('imagen')){  // Lendo código chie!
            const user = await Users.findById(id);
            if (!user) {
                throw new Error('Usuario no encontrado');
            };
            if(user.profile_img?.public_id){
                await cloudinary.uploader.destroy(user?.profile_img?.public_id, { resource_type: "image" });
                user.profile_img = {
                    public_id: body.imagen?.public_id,
                    secure_url: body.imagen?.secure_url
                };
                await user.save();
            };
        };
        const updateUser = await Users.findByIdAndUpdate(id, body, {new: true});
        if (updateUser) res.status(200).json(updateUser);
        else throw Error('Ocurrió un error al actualizar.');
    } catch (error) {
        next({message: error.message, statusCode: 404});
    }
};

module.exports = updateUser;
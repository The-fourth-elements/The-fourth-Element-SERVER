async function addResponse (req, res, next){
    try {
        
    } catch (error) {
        next({ message: error.message, statusCode: 400});
    }
};


module.exports = addResponse;
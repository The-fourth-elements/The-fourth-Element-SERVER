async function updateQuestions(req, res, next){
    try {
        
    } catch (error) {
        next({ message: error.message, statusCode: 404});
    }
};

module.exports = updateQuestions;
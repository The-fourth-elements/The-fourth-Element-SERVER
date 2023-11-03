

async function createResponseSR (req, res, next){
    try {
        
    } catch (error) {
        next({ message: error.message });
    }
};

module.exports = createResponseSR;
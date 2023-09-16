const Nationality = require('../models/Nationality')
module.exports = async (country) => {
    try {
        
        const countries = await Nationality.findOne({name:country})

        if(countries) return countries

       const newCountry = await Nationality.create({
            name : country
        })
        
       return newCountry
    } catch (error) {
        console.log(error.message)
    }

}


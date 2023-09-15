const Nationality = require('../models/Nationality')
async function allCountryDB (country) {
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


module.exports = allCountryDB
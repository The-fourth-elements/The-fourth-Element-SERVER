
//encontrar una forma mejor de obtener los paises.

async function getAllCountresApi () {
    try {
        const response = await fetch("https://www.universal-tutorial.com/api/countries/")

        const countries = await response.json()
        
        console.log(countries)
    } catch (error) {
        console.log(error.message)
    }

}


module.exports = getAllCountresApi





async function handleUserDB (Users, id){
        try {
            const user = await Users.findOne({
                "_id":id
            })

            if(user) return user

        } catch (error) {
            return {"error": "user id is empty"}
        }
}

async function handleAllUserDB(Users){
        try {
            const allUsers = await Users.find({})
        if(Array.isArray(allUsers) && allUsers.length) return allUsers
        throw Error('Users is empty')
         } catch (error) {
            return {error:error.message}
        }
}

module.exports = {
    handleUserDB,
    handleAllUserDB,
}
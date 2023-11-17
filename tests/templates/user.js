const individualUserTest = {
    username: "AnsonyEs",
    city: "New York",
    nationality: "United State",
    email: "user1@test.com",
    password: "Testpass1",
    sport: "Futbol",
    role: 0,
    age: 24,
    expYearsSports: 13
}

const testingUsers = [
    {   
        username: "HolaBogota",
        city: "Bogota",
        nationality: "Colombia",       
        email: "user2@test.com",
        password: "Testpass2",
        sport: "Handball",
        role: 1,
        age: 34,
        expYearsSports: 20
    },
    {
        username: "HolaMonaco",
        city: "Monaco",
        nationality: "Principate of Monaco",    
        email: "user3@test.com",
        password: "Testpass3",
        sport: "Voleyball",
        role: 2,
        age: 28,
        expYearsSports: 12
    }
];

const adminUser = {
    username: "FedeDev",
    city: "Mendoza",
    nationality: "Argentina",    
    email: "gabe.bastias10@gmail.com",
    password: "FGDEV123",
    sport: "Futbol",
    role: 3,
    age: 25,
    expYearsSports: 2
}

module.exports = {
    individualUserTest,
    testingUsers,
    adminUser
}
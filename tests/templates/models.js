const testCity = {name: "NewYork"};

const testModule = {
    name: "Module 1",
    description: "It's a module 1 of the course.",
    quiz: 3,
    video_url: "videoURL.com"
}

const testNationality = {name:"Argentino"};

const testProgress = {
    certificated: false,
    module_state: "In course",
    assistance: 3
}

const testRole = {perimision: 1};

const testStatus = {
    state: true,
    starting_date: Date.now,
    ending_date: null
}

module.exports = {
    testCity,
    testModule,
    testNationality,
    testProgress,
    testRole,
    testStatus
}
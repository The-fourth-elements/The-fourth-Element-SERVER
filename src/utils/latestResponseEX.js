

const latestResponsesEX = (responses) => {
    // console.log(response);
    try {
        const latestResponses = [];
        let firstResponse = responses[0];

        for (let i = 1; i < responses.length; i++) {
            if (firstResponse.index === responses[i].index) {
                if (firstResponse.date < responses[i].date ) {
                    latestResponses.push(responses[i].response);
                } else if(firstResponse.date > responses[i].date){
                    latestResponses.push(firstResponse.response);
                }
            } else {
                if (firstResponse.date < responses[i].date ) {
                    latestResponses.push(responses[i].response);
                } else if(firstResponse.date > responses[i].date){
                    latestResponses.push(firstResponse.response);
                }
            }
        }
        return latestResponses
        
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = latestResponsesEX;


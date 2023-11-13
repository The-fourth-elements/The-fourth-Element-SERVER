
const latestResponsesEX = (responses) => {
    try {
        const latestResponses = [];
        let index = 0;
        let arrayOfIndex = [];
        for (let i = 0; i < responses.length; i++) {
            arrayOfIndex.push(responses[i].index);
        }

        const indexSet = [...new Set(arrayOfIndex)];

        while (index < indexSet.length) {
            const subResponses = responses.filter(response => response.index === index);
            let returnedResponse = subResponses[0];
            for (let i = 1; i < subResponses.length; i++) {
                if (returnedResponse.date < subResponses[i].date) {
                    returnedResponse = subResponses[i];
                } else continue;
            }
            latestResponses.push(returnedResponse);
            index++;
        }
        return latestResponses;
    } catch (error) {
        return { error: error.message };
    }
}

module.exports = latestResponsesEX;

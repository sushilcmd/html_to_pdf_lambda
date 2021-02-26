
const success = (bodyData) => {
    return {
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        statusCode: 200,
        body: JSON.stringify(bodyData),
    }
}

const error = (err) => {
    return {
        headers: {
            "Content-type": "application/json",
        },
        statusCode: 500,
        body: JSON.stringify(err)
    };
}

exports.RES = {
    SUCCESS: success,
    FAILURE: error
}
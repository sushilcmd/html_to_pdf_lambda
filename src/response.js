const header={
            "Content-type": "application/json",
            'Access-Control-Allow-Credentials': true,
            "Access-Control-Allow-Methods": "OPTIONS,POST",
            "Access-Control-Allow-Headers":"Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token"
        }

const success = (bodyData,origin) => {
    return {
        headers:{...header, "Access-Control-Allow-Origin": origin},
        statusCode: 200,
        body: JSON.stringify(bodyData),
    }
}

const error = (err,origin) => {
    return {
        headers:{...header, "Access-Control-Allow-Origin": origin},
        statusCode: 500,
        body: JSON.stringify(err)
    };
}

exports.RES = {
    SUCCESS: success,
    FAILURE: error
}

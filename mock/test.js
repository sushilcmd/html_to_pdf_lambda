const { handler } = require('../index');
const payload=require('./payload.json');

const event={
    body:JSON.stringify(payload)
}

handler(event).then(res => console.log(res));
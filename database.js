const mongoose = require('mongoose');

module.exports = () => {
    let username = process.env.DATABASE_USERNAME;
    let password = process.env.DATABASE_PASSWORD;
    let url = process.env.DATABASE_URL;
    let database = process.env.DATABASE_NAME;

    let environment = process.env.ENVIRONMENT;
    
    let uri = `mongodb+srv://${username}:${password}@${url}/${database}?retryWrites=true&w=majority`;

    if (environment == 'development') {
        uri = 'mongodb://localhost/task-to-do'
    } else {
        uri = `mongodb+srv://${username}:${password}@${url}/${database}?retryWrites=true&w=majority`;
    }   

    mongoose.connect(uri,{ useUnifiedTopology: true, useNewUrlParser: true })
    .then(connection => {
        console.log("Database Connected.");
        console.log('Environment ',environment)
    })
    .catch(error => {
        console.log("Database Connection Error.");
        console.log(error);
    })
    
}



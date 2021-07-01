const monoose = require('mongoose');

module.exports = () => {
    let username = process.env.DATABASE_USERNAME;
    let password = process.env.DATABASE_PASSWORD;
    let url = process.env.DATABASE_URL;
    let database = process.env.DATABASE_NAME;

    let uri = `mongodb+srv://${username}:${password}@${url}/${database}?retryWrites=true&w=majority`;
    monoose.connect(uri,{ useUnifiedTopology: true, useNewUrlParser: true })
    .then(connection => {
        console.log("Database Connected.");
    })
    .catch(error => {
        console.log("Database Connection Error.");
        console.log(error);
    })
}

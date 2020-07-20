/*


App config file containing
all configurable variables.


*/

require('dotenv').config()


module.exports = {
    NAME: 'My Weekend Rocks',
    WEB: {
        port: 3000,
    },
    DB: {
        url: process.env.MONGO_URL,
        //port: 27018,
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
        database: process.env.MONGO_DB,
    }
}

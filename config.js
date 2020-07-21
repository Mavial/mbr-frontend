/*


App config file containing
all configurable variables.


*/

require('dotenv').config()


const port = 3000
const baseURL = `http://localhost:${port}`

module.exports = {
    NAME: 'My Weekend Rocks',
    baseURL: baseURL,
    port: port,
    // MONGODB
    DB: {
        url: process.env.MONGO_URL,
        //port: 27018,
        username: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
        database: process.env.MONGO_DB,
    },
    // JsonWebToken secret
    JWTsecret: 'mysecret',
    // OAuth2 credentials
    oauth2Credentials: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        project_id: process.env.GOOGLE_PROJECT_ID,
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uris: [
            `${baseURL}/auth/google/redirect`
        ],
        scopes: [
            //'profile', 
            'email',
        ]
    },
};
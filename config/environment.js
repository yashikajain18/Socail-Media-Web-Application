const development ={
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'wingledev@gmail.com',
            pass: 'btebfmzrkufrjiuy'
        }
    },
    google_clientID: "406179239876-896b969veqe36o8464pin29cclu9pnuo.apps.googleusercontent.com",
    google_clientSecret: "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",
    google_callbackURL: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',

}

const production ={
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIALSESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD,
        }
    },
    google_clientID: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_clientSecret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callbackURL: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
}

module.exports=eval(process.env.CODEIAL_ENVIRONMENT)==undefined? development:eval(process.env.CODEIAL_ENVIRONMENT);
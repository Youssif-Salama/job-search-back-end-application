"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const env = require("dotenv");
const path = require("path");
exports.default = (0, config_1.registerAs)('envConfig', () => {
    const nodeEnv = process.env.NODE_ENV;
    let envPath;
    if (nodeEnv === 'production') {
        envPath = path.resolve(__dirname, '../../.env.prod');
    }
    else {
        envPath = path.resolve(__dirname, '../../.env.dev');
    }
    env.config({ path: envPath });
    return {
        system: {
            node_env: process.env.NODE_ENV,
            port: process.env.PORT || 3000,
        },
        email: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
            reciever: process.env.EMAIL_RECIEVER,
        },
        jwt: {
            pass: process.env.JWT_PASS,
            exp: process.env.JWT_EXPIRES_IN,
        },
        bcrypt: {
            salting: process.env.BCRYPT_SALTING,
        },
        db: {
            type: process.env.DB_TYPE,
            user: process.env.DB_USER,
            pass: process.env.DB_PASS,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            name: process.env.DB_NAME,
        },
        links: {
            updateMyEmailRedirectionLink: process.env.UPDATE_MY_EMAIL_REDIRECTION_LINK
        },
        cloudinary: {
            name: process.env.CLOUDINARY_NAME,
            key: process.env.CLOUDINARY_API_KEY,
            secret: process.env.CLOUDINARY_API_SECRET
        },
        fe: {
            url: process.env.FRONTEND_URL || 'http://localhost:3000/'
        },
        be: {
            url: process.env.BACKEND_URL || 'http://localhost:3000/'
        }
    };
});
//# sourceMappingURL=env.config.js.map
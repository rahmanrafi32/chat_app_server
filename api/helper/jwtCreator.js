import jwt from 'jsonwebtoken';

export const accessToken = payload => {
    return jwt.sign({
            ...payload,
            iss: "Chat_App",
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 1800
        },
        `${process.env.JSON_SECRET_KEY}`,)
};

export const refreshToken = payload => {
    return jwt.sign({
            ...payload,
            iss: "Chat_App",
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000)  + 3.156e+7
        },
        `${process.env.JSON_SECRET_KEY}`,)
};


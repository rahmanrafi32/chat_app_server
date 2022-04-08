import jwt from 'jsonwebtoken';
require ('dotenv').config()

export const verifyJwtToken = async (bearerHeader) => {
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(" ");
        const jwtToken = bearer[1];

        if (!jwtToken) {
            return {
                message: "FORBIDDEN"
            };
        }

        try {
            const data = await jwt.verify(jwtToken, `${process.env.JSON_SECRET_KEY}`);
            // console.log("Validator data", data);

            if (!data) {
                return {
                    message: "UNAUTHORIZED"
                };
            }
            return data;
        } catch (error) {
            return {
                message: "UNAUTHORIZED"
            };
        }
    } else {
        return {
            message: "UNAUTHORIZED"
        };
    }
};
import {User} from "../../models/user";
import bcrypt from "bcrypt";
import {UserInputError} from "apollo-server-core";

export const signUp = async (parent, {payload: {firstName, lastName, email, password, phoneNumber}}, ctx, req) => {
    try {
        password = await bcrypt.hash(password, 12);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            phoneNumber
        });

        await newUser.save();

        return {
            message: "User Created"
        }
    } catch (err) {
        // console.log(err.errors);
        throw new UserInputError("BAD_INPUT", err.errors);
    }
}
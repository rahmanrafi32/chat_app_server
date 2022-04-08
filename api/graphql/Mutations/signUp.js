import {User} from "../../models/user";
import bcrypt from "bcrypt";
import {UserInputError} from "apollo-server-core";
import {ERROR, ERROR_STATUS} from "../../constant/errorMessages";

export const signUp = async (parent, {payload: {firstName, lastName, email, password, phoneNumber}}, ctx, req) => {
    try {
        const validEmail = (email) => {
            const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            return regEx.test(email);
        };
        const validPass = (pass) => {
            const regEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/
            return regEx.test(pass);
        };
        const validPhoneNumber = (number) => {
            const regEx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
            return regEx.test(number);
        };

        let errors = {};

        let existingUser = await User.findOne({
            email
        });

        if (firstName.trim() === "") errors.firstName = ERROR.FIRST_NAME_EMPTY;
        if (lastName.trim() === "") errors.lastName = ERROR.LAST_NAME_EMPTY;
        if (firstName.length < 3) errors.firstName = ERROR.SHORT_NAME;
        if (lastName.length < 3) errors.lastName = ERROR.SHORT_NAME;
        if (!validEmail(email)) errors.email = ERROR.VALID_EMAIL;
        if (existingUser) errors.email = ERROR.EMAIL_EXIST;
        if (!validPass(password)) errors.password = ERROR.VALID_PASS;
        if (!validPhoneNumber(phoneNumber)) errors.phoneNumber = ERROR.INVALID_PHONE_NUMBER;

        if (Object.keys(errors).length > 0) throw new UserInputError(ERROR_STATUS.BAD_INPUT, {errors});

        const newUser = new User({
            firstName,
            lastName,
            email,
            password,
            phoneNumber
        });
        newUser.password = await bcrypt.hash(password, 10);
        await newUser.save();

        return {
            message: ERROR.SUCCESSFUL
        }
    } catch (err) {
        console.log(err.extensions.errors);
        throw new UserInputError(ERROR_STATUS.BAD_INPUT, err.extensions.errors);
    }
}
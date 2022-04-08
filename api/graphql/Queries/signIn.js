import {UserInputError} from "apollo-server-core";
import {ERROR, ERROR_STATUS} from "../../constant/errorMessages";
import {User} from "../../models/user";
import bcrypt from "bcrypt";
import {accessToken, refreshToken} from "../../helper/jwtCreator";

export const signIn = async (_, {payload: {email, password}}, ctx, req) => {
    try {
        let errors = {};
        const user = await User.findOne({email});

        if (user === null) {
            errors.email = ERROR.USER_NOT_EXIST;
            throw new UserInputError(ERROR_STATUS.BAD_INPUT, {errors});
        }

        const confirmPass = await bcrypt.compare(password, user.password);

        if (!confirmPass) {
            errors.password = ERROR.PASSWORD_MISMATCH;
            throw new UserInputError(ERROR_STATUS.BAD_INPUT, {errors})
        }

        let access_token = await accessToken({
            _id: user._id,
            email: user.email
        });


        let refresh_token = await refreshToken({
            _id: user._id,
            email: user.email
        });


        return {
            message: ERROR.SUCCESSFUL,
            access_token,
            refresh_token
        }

    } catch (err) {
        // console.log(err.extensions.errors);
        throw new UserInputError(ERROR_STATUS.BAD_INPUT, err.extensions.errors);
    }
}
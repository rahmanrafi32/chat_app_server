import mongoose from "mongoose";
import bcrypt from "bcrypt";

const validateEmail = function (email) {
    const regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regEx.test(email)
};

const validatePass = function (password) {
    const regEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    return regEx.test(password)
};

const userSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: true,
            min: [2, 'Name is too short'],
        },
        lastName: {
            type: String,
            required: true,
            min: [2, 'Name is too short'],
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            validate: [validateEmail, 'Please enter a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
        },
        password: {
            type: String,
            required: 'Password is required',
            validate: [validatePass, 'Please enter a valid password'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid password']
        },
        profilePicture: {
            type: String
        },
        emailVerification: {
            type: Boolean,
            default: false,
            enum: [true, false]
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

userSchema.index({createdAt: 1, updatedAt: 1});

userSchema.methods.encryptPassword = function (password) {
    return bcrypt.hash(password, 10);
};
userSchema.methods.checkPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchema);
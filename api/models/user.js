import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        firstName: {
            type: String,
            trim: true,
        },
        lastName: {
            type: String,
            trim: true,
        },
        phoneNumber: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
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

export const User = mongoose.model("User", userSchema);
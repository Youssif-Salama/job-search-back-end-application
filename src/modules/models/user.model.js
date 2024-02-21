import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: [true, "First name is required"],
        minlength: [3, "First name should be at least 3 characters"],
        maxlength: [10, "First name should not exceed 10 characters"]
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "Last name is required"],
        minlength: [3, "Last name should be at least 3 characters"],
        maxlength: [10, "Last name should not exceed 10 characters"]
    },
    fullName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            "Please provide a valid email address"
        ]
    },
    phone: {
        type: String,
        unique: true,
        required: [true, "Phone number is required"],
        match: [
            /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/,
            "Please provide a valid phone number"
        ]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        match: [
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
            "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one number"
        ]
    },
    DateOB: {
        type: Date,
        required: [true, "Date of Birth is required"],
        match: /^([0-9]{4})(\/|-)(1[0-2]|0?[1-9])\2(3[01]|[12][0-9]|0?[1-9])$/
    },
    skills: [{
        type: String,
        required: true
    }],
    address: {
        type: String,
    },
    role: {
        type: String,
        enum: ["USER", "COMPANY_HR", "ADMIN"],
        default: "USER"
    },
    loggedIn: {
        type: Boolean,
        default: false
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    company: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    (this.firstName && this.lastName) ? this.fullName = this.firstName + " " + this.lastName : this.fullName = null;
    next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
    const _update = this.getUpdate();

    if (_update?.firstName || _update?.lastName) {
        _update.fullName = `${_update.firstName || ""} ${_update.lastName || ""}`.trim();
    } else {
        _update.fullName = null;
    }

    next();
});



const userModel = mongoose.model("User", userSchema);
export { userModel }

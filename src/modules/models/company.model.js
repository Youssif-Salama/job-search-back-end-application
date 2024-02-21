import mongoose from "mongoose";
import slugify from "slugify";
const companySchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, "Company name is required"],
        unique: true,
        minlength: [3, "Company name should be at least 3 characters"],
        maxlength: [20, "Company name should not exceed 20 characters"]
    },
    slug: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        minlength: [20, "Description should be at least 20 characters"],
        maxlength: [500, "Description should not exceed 500 characters"]
    },
    industry: {
        type: String,
        required: [true, "Industry is required"],
    },
    address: {
        country: {
            type: String,
            required: [true, "Country is required"]
        },
        governRate: {
            type: String,
            required: [true, "Governorate is required"]
        },
        postalCode: {
            type: String
        }
    },
    numOfEmployees: {
        from: {
            type: Number,
            required: [true, "Minimum number of employees is required"],
            min: [1, "Minimum number of employees should be at least 1"]
        },
        to: {
            type: Number,
            required: [true, "Maximum number of employees is required"]
        }
    },
    email: {
        type: String,
        unique: true,
        match: [/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/, "Invalid email format"]
    },
    companyHr: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    confirmed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

companySchema.post("save", function (error, doc, next) {
    if (error.name === "MongoError" && error.code === 11000) {
        next(new Error("Duplicate key error: This company name or email already exists."));
    } else {
        next(error);
    }
});

companySchema.pre("save", function (next) {
    this.slug = slugify(this.companyName);
    next();
})
companySchema.pre(/update/i, function (next) {
    if (this._update?.companyName) {
        this._update.slug = slugify(this._update.companyName);
        next();
    }
    next();
})

const companyModel = mongoose.model("Company", companySchema);
export { companyModel }
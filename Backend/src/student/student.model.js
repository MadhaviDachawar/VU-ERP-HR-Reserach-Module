import mongoose from "mongoose"
import User from "../user/user.model.js"

const studentSchema = new mongoose.Schema({
    srnNumber: {
        type: String,
        unique: true,
        required: true
    },
    prnNumber: {
        type: String,
        // unique: true
        // required: true,
    },
    admissionDate: {
        type: Date,
        required: true
    },
    candidateQualifyingMarksheetName: {
        type: String
    },
    candidateQualifyingMarksheetNameDevnagiri: {
        type: String
    },
    programme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Programme",
    },
    admissionIntoYear: {
        type: String,
        required: true
    },
    familyDetails: {
        type: [
            {
                fullName: String,
                relation: String,
                profession: String,
                workExperience: String,
                companyName: String,
                annualIncome: String,
                mobileNumber: Number,
                email: String,
                address: String,
            },
        ],
        default: [],
    },
    feeStructures: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "FeeStructure"
            }
        ]
    }
})

const Student = User.discriminator("Student", studentSchema)

export default Student
import mongoose from "mongoose"
import User from "../user/user.model.js"

const staffSchema = new mongoose.Schema({
    employmentNumber: {
        type: String,
        required: true,
    },
    joiningDate: {
        type: Date,
        required: true
    },
    joiningDesignation: {
        type: String,
        required: true
    },
    spouseDetails: {
        type: [
            {
                name: String,
                working: String,
                mobileNumber: String,
                email: String,
                company: String,
            },
        ],
        default: [],
    },
    personalInsurance: {
        type:
        {
            accidentClaim: Boolean,
            mediClaim: Boolean,
            termInsurance: Boolean,
        },
        default: [],
    },
    vuInsurance: {
        type:
        {
            accidentClaim: Boolean,
            mediClaim: Boolean,
            termInsurance: Boolean,
        },
        default: [],
    },
})

const Staff = User.discriminator("Staff", staffSchema)

export default Staff
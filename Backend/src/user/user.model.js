import mongoose from "mongoose"
import { transporter } from "../nodemailer/nodemailerConfig.js"
import bcrypt from "bcrypt"

const options = {
    discriminatorKey: "role",
}

const UserSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
        },
        password: {
            type: String,
        },
        userType: {
            type: Number,
            required: true,
            default: 7,
        },
        name: {
            type: [
                {
                    firstName: String,
                    middleName: String,
                    lastName: String,
                },
            ],
            required: true,
            default: [],
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        faculty: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Faculty",
        },
        school: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "School",
        },
        department: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Department",
        },
        aadharNumber: {
            type: String,
            // required: true,
        },
        drivingLicense: {
            type: String,
        },
        pan: {
            type: String,
        },
        passport: {
            type: String,
        },

        bloodGroup: {
            type: String,
            // enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        },
        motherTongue: {
            type: String
        },
        gender: {
            type: String
        },
        placeOfBirth: {
            type: String
        },
        nationality: {
            type: String,
        },
        domicileState: {
            type: String,
        },
        caste: {
            type: String,
        },
        subCaste: {
            type: String,
        },
        religion: {
            type: String
        },
        category: {
            type: String
        },
        admissionCategory: {
            type: String
        },
        maritalStatus: {
            type: String,
            // enum: ["Single", "Married", "Divorced", "Widowed"],
        },
        noOfChildren: {
            type: Number,
        },
        covidVaccinated: {
            type: Boolean,
            enum: [true, false]
        },
        physicalDisability: {
            type: Boolean,
            enum: [true, false]
        },
        physicalDisabilityPercentage: {
            type: Number,
        },
        mobileNumbers: {
            type: [String],
            // required: true,
            default: [],
        },
        emails: {
            type: [String],
            // required: true,
            default: [],
        },
        vuEmail: {
            type: String,
        },
        emergencyContactName: {
            type: String
        },
        emergencyContactNumber: {
            type: Number
        },
        addresses: {
            type: [
                {
                    addressType: String,
                    houseNumber: String,
                    streetName: String,
                    landmark: String,
                    pincode: String,
                    state: String,
                    district: String,
                    tehsil: String,
                    village: String,
                },
            ],
            // required: true,
            default: [],
        },

        qualificationDetails: {
            type: [
                {
                    university: String,
                    passingYear: Number,
                    marks: Number,
                    maxMarks: Number,
                    percentage: Number,
                    grade: String,
                    class: String,
                    specialization: String,
                    remarks: String,
                },
            ],
            default: [],
        },
        experienceDetails: {
            type: [
                {
                    employer: String,
                    position: String,
                    salaryDrawn: Number,
                    from: Date,
                    to: Date,
                    experienceType: String,
                    rolesAndresponsibility: String,
                    additionalInfo: String,
                    remarks: String,
                },
            ],
            default: [],
        },
        bankDetails: {
            type: [
                {
                    bankName: String,
                    accountNumber: String,
                    branch: String,
                    ifsc: String,
                    nominee: String,
                },
            ],
            default: [],
        },
        otherInformation: {
            type: [
                {
                    infoType: String,
                    details: String,
                    remarks: String,
                },
            ],
            default: [],
        },
        documents: {
            type: [
                {
                    docName: String,
                    docNumber: String,
                    details: String,
                    path: String,
                },
            ],
            default: [],
        },
    },
    options
)

function randomstring(L) {
    var s = ""
    var randomchar = function () {
        var n = Math.floor(Math.random() * 62)
        if (n < 10) return n //1-10
        if (n < 36) return String.fromCharCode(n + 55) //A-Z
        return String.fromCharCode(n + 61) //a-z
    }
    while (s.length < L) s += randomchar()
    return s
}

UserSchema.post("save", async function () {
    var user = this

    try {
        let randomPassword = randomstring(7)
        let encryptedPass = bcrypt.hashSync(randomPassword, 10)

        await User.findOneAndUpdate({ userName: user.userName }, { password: encryptedPass }, {
            returnOriginal: false
        })

        transporter.sendMail({
            from: '"VU-ERP" <noreply.vupune@gmail.com>', // sender address
            to: user.emails[0], // list of receivers
            subject: "VU-ERP Login Credentials", // Subject line
            html:
                `
               <p><b>VU-ERP Login Created Successfully</b></p>
               <p><b>Username:</b> ` +
                user.userName +
                ` </p>
               <p><b>Password:</b> ` +
                randomPassword +
                ` </p>
               <p>Website Link: <a href="https://vuerp.herokuapp.com">https://vuerp.herokuapp.com</a></p>
               `,
            text: "", // plain text body
        })
    } catch (error) {
        console.log(error)
    }
})

const User = mongoose.model("User", UserSchema)

export default User
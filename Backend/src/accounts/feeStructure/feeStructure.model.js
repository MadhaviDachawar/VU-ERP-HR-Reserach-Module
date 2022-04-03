import mongoose from "mongoose"

const FeeStructureSchema = new mongoose.Schema({
    academicYear: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    configurationName: {
        type: String,
        required: true
    },
    programme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Programme",
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
    structure: {
        type: [
            {
                feeType: {
                    type: String,
                    required: true
                },
                amount: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
})

const FeeStructure = mongoose.model("FeeStructure", FeeStructureSchema)

export default FeeStructure
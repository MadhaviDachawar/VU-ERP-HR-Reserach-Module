import mongoose from "mongoose"

const programmesDataYearlySchema = new mongoose.Schema({
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
    programme: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Programme",
    },
    SanctionedIntake: {
        type: Number,
        required: true
    },
    TotalAdmittedStudents: {
        type: Number,
        required: true,
    },
    Fees: {
        type: Number,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    AcademicYear: {
        type: String,
        required: true,
    }
})

const ProgrammesDataYearly = mongoose.model("programmesDataYearly", programmesDataYearlySchema)

export default ProgrammesDataYearly
import mongoose from "mongoose"

const ProgrammeSchema = new mongoose.Schema({
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
    name: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
    },
    // coordinator: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // },
})

const Programme = mongoose.model("Programme", ProgrammeSchema)

export default Programme
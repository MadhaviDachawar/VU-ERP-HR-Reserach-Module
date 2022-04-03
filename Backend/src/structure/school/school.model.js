import mongoose from "mongoose"

const SchoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
    },
    vision: {
        type: String,
        required: true,
    },
    mission: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    // director: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User"
    // },
    director: {
        type: String,
        // ref: "User"
        required: true,
    },
})

const School = mongoose.model("School", SchoolSchema)

export default School
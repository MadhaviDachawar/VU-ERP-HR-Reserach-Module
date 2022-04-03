import mongoose from "mongoose"

const FacultySchema = new mongoose.Schema({
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "universityStructure"
    },
    name: {
        type: String,
        required: true,
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
    dean: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
})

const Faculty = mongoose.model("Faculty", FacultySchema)

export default Faculty
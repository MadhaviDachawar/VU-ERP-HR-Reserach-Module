import mongoose from "mongoose"

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Faculty",
    },
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "School",
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
    hod: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User"
        type: String,
        required: true,
    },
})

const Department = mongoose.model("Department", DepartmentSchema)

export default Department
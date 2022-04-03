import mongoose from "mongoose"

const universityStructureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    establishedOn: {
        type: Date,
        required: true
    },
    colleges: {
        type: [
            {
                name: String,
                location: String
            }
        ]
    }
})

const universityStructure = new mongoose.model("universityStructure", universityStructureSchema)

export default universityStructure
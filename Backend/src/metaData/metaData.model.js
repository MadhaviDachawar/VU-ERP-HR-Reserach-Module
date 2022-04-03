import mongoose from "mongoose"

const MetaDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    data: {
        type: [],
        required: true,
    },
})

const MetaData = mongoose.model("Metadata", MetaDataSchema)

export default MetaData
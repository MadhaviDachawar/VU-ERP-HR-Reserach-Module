import universityStructure from "./universityStructure.model.js"

export const create = async (req, res) => {
    // var structure = new universityStructure({ college: "bakri" })
    // await structure.save()
}

export const read = async (req, res) => {
    try {
        let universityList = await universityStructure.find({})
        return res.status(200).json(universityList)
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

export const find = async (req, res) => {

}

export const update = async (req, res) => {

}

export const remove = async (req, res) => {

}
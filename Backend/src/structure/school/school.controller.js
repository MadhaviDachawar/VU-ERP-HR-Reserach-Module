import School from "./school.model.js"

export const create = async(req, res) => {
    try {
        const { newName, director, mission, vision, code, faculty } = req.body
        var school = new School({ name: newName, director, mission, vision, code, faculty })
        await school.save()
        res.status(201).json(school)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const read = async(req, res) => {
    try {
        const schools = await School.find({}).populate("faculty")
            // .populate('director')
        res.status(200).json(schools)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const find = async(req, res) => {
    const { id } = req.params
    try {
        const school = await School.findById(id).populate("faculty")
        res.status(200).json(school)
    } catch (err) {
        res.status(500).json({})
    }
}

export const update = async(req, res) => {
    try {
        const { _id, newName, director, mission, vision, code } = req.body
        var school = await School.findByIdAndUpdate(_id, { name: newName, director, mission, vision, code }, { new: true })
        res.status(200).json(school)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const remove = async(req, res) => {
    const { id } = req.params
    try {
        const toDelete = await School.findById(id).populate("faculty")
        if (!toDelete) {
            res.status(404).json({})
        }
        const school = await School.findByIdAndRemove(id)
        if (!school) {
            res.status(404).json({})
        }
        res.status(200).json(toDelete)
    } catch (err) {
        res.status(500).json({})
    }
}
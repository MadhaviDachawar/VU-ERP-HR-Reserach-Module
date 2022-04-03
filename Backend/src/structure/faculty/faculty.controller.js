import Faculty from "./faculty.model.js"

export const create = async (req, res) => {
    try {
        const { newName, code, dean, mission, vision } = req.body
        var faculty = new Faculty({ name: newName, code, dean, mission, vision })
        await faculty.save()
        res.status(201).json(faculty)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const read = async (req, res) => {
    try {
        const faculties = await Faculty.find({})
            .populate('dean')
        // 612f69fe525a0b3c9863a8b6
        res.status(200).json(faculties)
    } catch (err) {
        res.status(500).json({})
    }
}

export const find = async (req, res) => {
    const { id } = req.params
    try {
        const faculty = await Faculty.findById(id)
        res.status(200).json(faculty)
    } catch (err) {
        res.status(500).json({})
    }
}
export const update = async (req, res) => {
    try {
        const { _id, newName, dean, mission, vision, code } = req.body
        var faculty = await Faculty.findByIdAndUpdate(_id, { name: newName, dean, mission, vision, code }, { new: true })
        res.status(200).json(faculty)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
export const remove = async (req, res) => {
    const { id } = req.params
    try {
        const faculty = await Faculty.findByIdAndRemove(id)
        if (!faculty) {
            res.status(404).json({})
        }
        res.status(200).json({ faculty })
    } catch (err) {
        res.status(500).json({})
    }
}

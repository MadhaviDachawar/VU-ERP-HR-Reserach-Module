import Department from "./department.model.js"

export const create = async(req, res) => {
    try {
        const { newName, hod, mission, vision, code, faculty, school } = req.body
        var department = new Department({ name: newName, hod, mission, vision, code, faculty, school })
        await department.save()
        res.status(201).json(department)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const read = async(req, res) => {
    try {
        const departments = await Department.find({})
            .populate("faculty")
            .populate("school")
        res.status(200).json(departments)
    } catch (err) {
        res.status(500).json({})
    }
}

export const find = async(req, res) => {
    const { id } = req.params
    try {
        const department = await Department.findById(id)
            .populate("faculty")
            .populate("school")
        res.status(200).json(department)
    } catch (err) {
        res.status(500).json({})
    }
}
export const update = async(req, res) => {
    try {
        const { _id, newName, hod, mission, vision, code } = req.body
        var department = await Department.findByIdAndUpdate(_id, { name: newName, hod, mission, vision, code }, { new: true })
        res.status(200).json(department)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
export const remove = async(req, res) => {
    const { id } = req.params
    try {
        const toDelete = await Department.findById(id)
            .populate("faculty")
            .populate("school")
        if (!toDelete) {
            res.status(404).json({})
        }
        const department = await Department.findByIdAndRemove(id)
        if (!department) {
            res.status(404).json({})
        }
        res.status(200).json(department)
    } catch (err) {
        res.status(500).json({})
    }
}
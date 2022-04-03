import Student from "./student.model.js"

export const create = async (req, res) => {
    const data = req.body
    var student = new Student({ ...data })

    try {
        const {
            srnNumber,
            name,
            email,
            mobileNumber,
            address,
            qualificationDetails,
            experienceDetails,
            bankDetails,
            emergencyDetails,
            spouseDetails,
            otherInformation,
        } = data

        student.userName = srnNumber
        student.userType = 7
        student.name = [...name]
        student.email = email
        student.mobileNumber = mobileNumber
        student.address = address
        student.qualificationDetails = qualificationDetails
        student.experienceDetails = experienceDetails
        student.bankDetails = bankDetails
        student.emergencyDetails = emergencyDetails
        student.spouseDetails = spouseDetails
        student.otherInformation = otherInformation

        await student.save()

        return res.status(201).json({
            message: "Student Added Successfully"
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

export const read = async (req, res) => {
    try {
        const students = await Student.find({}, "-password").populate({
            path: "faculty school department programme",
        })
        return res.status(200).json(students)
    } catch (err) {
        return res.status(500).json({})
    }
}

export const find = async (req, res) => {
    const { id } = req.params
    try {
        const student = await Student.findById(id, "-password")
            .populate("programme")
            .populate("faculty")
            .populate("department")
            .populate("school")
        if (!student) {
            res.status(500).json({
                message: "Student NOT found!"
            })
        }
        return res.status(200).json(student)
    } catch (err) {
        return res.status(500).json({})
    }
}

export const findBySrn = async (req, res) => {
    const { srn } = req.params
    try {
        const student = await Student.findOne({ "srnNumber": srn }, "-password")
            .populate("programme")
            .populate("faculty")
            .populate("department")
            .populate("school")
        if (!student) {
            return res.status(500).json({
                message: "Student NOT found!"
            })
        }
        return res.status(200).json(student)
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

export const update = async (req, res) => {
    const { id } = req.params
    const data = req.body
    const { name, email, mobileNumber, address, ...rest } = data

    try {
        await Student.findByIdAndUpdate(id, { $set: data })
        return res.status(200).json({ message: "Updated Successfully" })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

export const updateBySrn = async (req, res) => {
    try {
        const srn = req.body.srn
        const data = req.body.data
        const { name, email, mobileNumber, address, ...rest } = data
        await Student.findOneAndUpdate({ srnNumber: srn }, { $set: data })

        return res.status(200).json({ message: "Updated Successfully" })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

export const remove = async (req, res) => {
    const { id } = req.params
    try {
        var toDelete = await Student.findById(id, "-password").populate({
            path: "courses",
            populate: {
                path: "faculty  schoolId departmentId programmeId",
            },
        })
        if (!toDelete) {
            res.status(404).json({})
        }
        const student = await Student.findByIdAndRemove(id)
        if (!student) {
            res.status(404).json({})
        }
        return res.status(200).json(toDelete)
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}
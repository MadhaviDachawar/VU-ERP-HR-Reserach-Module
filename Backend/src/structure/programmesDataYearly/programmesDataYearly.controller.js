import ProgrammesDataYearly from "./programmesDataYearly.model.js"

export const create = async(req, res) => {
    console.log(req.body);

    const {
        faculty,
        school,
        department,
        programme,
        SanctionedIntake,
        TotalAdmittedStudents,
        Fees,
        duration,
        AcademicYear
    } = req.body

    try {
        var programmesDataYearly = new ProgrammesDataYearly({
            faculty,
            school,
            department,
            programme,
            SanctionedIntake,
            TotalAdmittedStudents,
            Fees,
            duration,
            AcademicYear
        })
        await programmesDataYearly.save()
            // var id = programme._id
            // programme = await Programme.findById(id)
            //     .populate("faculty")
            //     .populate("school")
            //     .populate("department")
            //     // .populate({
            //     // 	path: "schoolId",
            //     // 	populate: "facultyId",
            //     // })
            //     // .populate({
            //     // 	path: "departmentId",
            //     // 	populate: {
            //     // 		path: "schoolId",
            //     // 		populate: "facultyId",
            //     // 	},
            //     // })
        res.status(201).json(programme)
    } catch (err) {
        console.log(err);
        res.status(500).json({})
    }
}

export const read = async(req, res) => {
    console.log("reading programme data yearly");
    try {
        const programmesDataYearly = await ProgrammesDataYearly.find({})
            .populate("faculty")
            .populate("school")
            .populate("department")
            .populate("programme")
        res.status(200).json(programmesDataYearly)
    } catch (err) {
        console.log(err);
        res.status(500).json({})
    }
}

export const find = async(req, res) => {
    const { id } = req.params

    try {
        const programme = await Programme.findById(id)
            .populate("faculty")
            .populate("school")
            .populate("department")
        res.status(200).json(programme)
    } catch (err) {
        res.status(500).json({})
    }
}
export const update = async(req, res) => {
    const { id } = req.params
    const data = req.body
    try {
        var programme = await Programme.findByIdAndUpdate(
            id, {...data }, { new: true }
        )
        if (!programme) {
            res.status(404).json({})
        }
        programme = await Programme.findById(id)
            .populate("faculty")
            .populate("school")
            .populate("department")
        res.status(200).json(programme)
    } catch (err) {
        res.status(500).json({})
    }
}
export const remove = async(req, res) => {
    const { id } = req.params
    try {
        const toDelete = await Programme.findById(id)
            .populate("faculty")
            .populate("school")
            .populate("department")
        if (!toDelete) {
            res.status(404).json({})
        }
        const programme = await Programme.findByIdAndRemove(id)
        if (!programme) {
            res.status(404).json({})
        }
        res.status(200).json(toDelete)
    } catch (err) {
        res.status(500).json({})
    }
}
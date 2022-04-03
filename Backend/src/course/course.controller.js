import Course from "./course.model.js"

export const create = async (req, res) => {
	const { courseType, ...rest } = req.body
	try {
		var course = new Course({ ...rest })
		course.courseType = [...courseType]
		await course.save()
		var id = course._id
		course = await Course.findById(id)
			.populate("facultyId")
			.populate({
				path: "schoolId",
				populate: "facultyId",
			})
			.populate({
				path: "departmentId",
				populate: {
					path: "schoolId",
					populate: "facultyId",
				},
			})
			.populate({
				path: "programmeId",
				populate: {
					path: "departmentId",
					populate: {
						path: "schoolId",
						populate: "facultyId",
					},
				},
			})
		res.status(201).json(course)
	} catch (err) {
		res.status(500).json({})
	}
}

export const read = async (req, res) => {
	try {
		const courses = Course.find({})
			.populate("facultyId")
			.populate({
				path: "schoolId",
				populate: "facultyId",
			})
			.populate({
				path: "departmentId",
				populate: {
					path: "schoolId",
					populate: "facultyId",
				},
			})
			.populate({
				path: "programmeId",
				populate: {
					path: "departmentId",
					populate: {
						path: "schoolId",
						populate: "facultyId",
					},
				},
			})
		res.status(200).json(courses)
	} catch (err) {
		res.status(500).json({})
	}
}

export const find = async (req, res) => {
	const { id } = req.params
	try {
		const course = Course.findById(id)
			.populate("facultyId")
			.populate({
				path: "schoolId",
				populate: "facultyId",
			})
			.populate({
				path: "departmentId",
				populate: {
					path: "schoolId",
					populate: "facultyId",
				},
			})
			.populate({
				path: "programmeId",
				populate: {
					path: "departmentId",
					populate: {
						path: "schoolId",
						populate: "facultyId",
					},
				},
			})
		if (!course) {
			res.status(404).json({})
		}
		res.status(200).json(course)
	} catch (err) {
		res.status(500).json({})
	}
}

export const update = async (req, res) => {
	const { id } = req.params
	const data = req.body
	const { courseType, ...rest } = data
	try {
		var course = await Course.findByIdAndUpdate(id, rest, { new: true })
		if (!course) {
			res.status(404).json()
		}
		course = await Course.findById(id)
		course.courseType = [...courseType]
		await course.save()
		course = await Course.findById(id)
			.populate("facultyId")
			.populate({
				path: "schoolId",
				populate: "facultyId",
			})
			.populate({
				path: "departmentId",
				populate: {
					path: "schoolId",
					populate: "facultyId",
				},
			})
			.populate({
				path: "programmeId",
				populate: {
					path: "departmentId",
					populate: {
						path: "schoolId",
						populate: "facultyId",
					},
				},
			})
		res.status(200).json(course)
	} catch (err) {
		res.status(500).json({})
	}
}

export const remove = async (req, res) => {
	const { id } = req.params
	try {
		var toDelete = Course.findById(id)
			.populate("facultyId")
			.populate({
				path: "schoolId",
				populate: "facultyId",
			})
			.populate({
				path: "departmentId",
				populate: {
					path: "schoolId",
					populate: "facultyId",
				},
			})
			.populate({
				path: "programmeId",
				populate: {
					path: "departmentId",
					populate: {
						path: "schoolId",
						populate: "facultyId",
					},
				},
			})
		if (!toDelete) {
			res.status(404).json({})
		}
		const course = Course.findByIdAndRemove(id)
		if (!course) {
			res.status(404).json({})
		}
		res.status(200).json(course)
	} catch (err) {
		res.status(500).json({})
	}
}

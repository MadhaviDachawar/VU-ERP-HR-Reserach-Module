import mongoose from "mongoose"

const CourseSchema = new mongoose.Schema({
	courseName: {
		type: String,
		required: true,
	},
	facultyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Faculty",
	},
	schoolId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "School",
	},
	department: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Department",
	},
	programme: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Programme",
	},
	courseType: {
		type: [
			{
				typeOf: {
					type: String,
					enum: ["Theory", "Practical", "Tutorial", "Studio"],
				},
				typeCode: {
					type: String,
				},
				typeCredits: {
					type: Number,
				},
				typeSessions: {
					type: Number,
				},
				typeESEMarks: {
					type: Number,
				},
				typeCIEMarks: {
					type: Number,
				},
			},
		],
	},
})

const Course = mongoose.model("Course", CourseSchema)

export default Course

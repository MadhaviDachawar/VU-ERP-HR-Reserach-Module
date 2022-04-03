import Staff from "./staff.model.js"

export const create = async (req, res) => {
	const data = req.body
	var staff = new Staff({ ...data })

	try {
		const {
			employmentNumber,
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

		staff.userName = employmentNumber
		staff.userType = 1
		staff.name = [...name]
		staff.email = email
		staff.mobileNumber = mobileNumber
		staff.address = address
		staff.qualificationDetails = qualificationDetails
		staff.experienceDetails = experienceDetails
		staff.bankDetails = bankDetails
		staff.emergencyDetails = emergencyDetails
		staff.spouseDetails = spouseDetails
		staff.otherInformation = otherInformation

		await staff.save()

		res.status(201).json({
			message: "Staff Added Succesfully!"
		})

	} catch (err) {
		console.log(err.message)
		return res.status(500).json({
			message: err.message
		})
	}
}

export const read = async (req, res) => {
	try {
		const staffs = await Staff.find({}, "-password").populate({
			path: "faculty school department programme",
		})
		res.status(200).json(staffs)
	} catch (err) {
		return res.status(500).json({
			message: err.message
		})
	}
}

export const find = async (req, res) => {
	const { id } = req.params
	try {
		const staff = await Staff.findById(id, "-password").populate({
			path: "faculty school department programme",
		})
		if (!staff) {
			res.status(404).json({})
		}
		res.status(200).json(staff)
	} catch (err) {
		return res.status(500).json({
			message: err.message
		})
	}
}

export const findByEn = async (req, res) => {
	const { employmentNumber } = req.params
	try {
		const staff = await Staff.findOne({ "employmentNumber": employmentNumber }, "-password")
			.populate("faculty")
			.populate("department")
			.populate("school")
		if (!staff) {
			return res.status(500).json({
				message: "Staff NOT found!"
			})
		}
		return res.status(200).json(staff)
	} catch (err) {
		return res.status(500).json({
			message: err.message
		})
	}
}

export const update = async (req, res) => {
	const { id } = req.params
	const data = req.body
	const {
		name,
		email,
		mobileNumber,
		address,
		courses,
		qualificationDetails,
		experienceDetails,
		bankDetails,
		emergencyDetails,
		spouseDetails,
		otherInformation,
		documents,
		...rest
	} = data

	try {
		await Staff.findByIdAndUpdate(id, { $set: data })
		res.status(200).json({ message: "Updated Successfully" })
	} catch (err) {
		return res.status(500).json({
			message: err.message
		})
	}
}

export const updateByEN = async (req, res) => {
	try {
		const employmentNumber = req.body.employmentNumber
		const data = req.body.data
		const { name, email, mobileNumber, address, ...rest } = data
		await Staff.findOneAndUpdate({ employmentNumber: employmentNumber }, { $set: data })

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
		const toDelete = await Staff.findById(id, "-password").populate({
			path: "faculty school department programme",
		})
		if (!toDelete) {
			res.status(404).json({})
		}
		const staff = await Staff.findByIdAndRemove(id)
		if (!staff) {
			res.status(404).json({})
		}
		res.status(200).json(toDelete)
	} catch (err) {
		return res.status(500).json({
			message: err.message
		})
	}
}
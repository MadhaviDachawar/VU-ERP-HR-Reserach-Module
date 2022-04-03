import User from "../user/user.model.js"

export const generateEN = async (req, res) => {
    try {
        let employmentNumber = null
        let eNMaxRecord = await User.findOne({ role: 'Staff' }).sort([['employmentNumber', -1]])

        if (eNMaxRecord == null) {
            employmentNumber = 10001
        } else {
            employmentNumber = parseInt(eNMaxRecord.employmentNumber) + 1
        }

        res.status(200).json({
            employmentNumber: employmentNumber,
            message: "Employement Number generated"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const generateSRN = async (req, res) => {
    try {
        let srnNumber = null
        let srnMaxRecord = await User.findOne({ role: 'Student' }).sort([['srnNumber', -1]])

        if (srnMaxRecord == null) {
            srnNumber = 202100001
        } else {
            srnNumber = parseInt(srnMaxRecord.srnNumber) + 1
        }

        res.status(200).json({
            srn: srnNumber,
            message: "SRN generated"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const generatePRN = async (req, res) => {
    try {
        let prnNumber = null
        let prnMaxRecord = await User.findOne({ role: 'Student' }).sort([['srnNumber', -1]])

        if (prnMaxRecord == null) {
            prnNumber = 202100001
        } else {
            prnNumber = parseInt(prnMaxRecord.prnNumber) + 1
        }

        res.status(200).json({
            prn: prnNumber,
            message: "SRN generated"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
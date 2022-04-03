import FeeStructure from './feeStructure.model.js'

export const getFeeStructures = async (req, res) => {
    try {
        let feeStructures = await FeeStructure.find({})
            .populate('programme')
            .populate('faculty')
            .populate('school')
            .populate('department')

        res.status(201).json(feeStructures)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

export const saveFeeStructure = async (req, res) => {
    try {
        const feeStructure = req.body.feeStructure

        let newStructure = new FeeStructure(feeStructure)
        await newStructure.save()

        res.status(200).json({
            message: "Fee Structure Saved Successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}
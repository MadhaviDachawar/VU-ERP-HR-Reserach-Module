import MetaData from './metaData.model.js'

export const getMetaData = async (req, res) => {
    try {
        let responseObj = {}
        const response = await MetaData.find({ name: { $in: req.body.names } })

        response.map(metaData => {
            responseObj[metaData.name] = metaData.data
        })

        return res.status(200).json(responseObj)
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}
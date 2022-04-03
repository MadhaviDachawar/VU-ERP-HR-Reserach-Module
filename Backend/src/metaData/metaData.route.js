import { Router } from "express"

import { getMetaData } from "./metaData.controller.js"

const metaDataRouter = Router()

metaDataRouter.post("/getMetaData", getMetaData)

export default metaDataRouter
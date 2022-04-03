import { Router } from "express"

import { getFeeStructures, saveFeeStructure } from "./feeStructure/feeStructure.controller.js"

const accountsRoutes = Router()

// feeStructureRoutes
accountsRoutes.get("/feeStructure/getFeeStructures", getFeeStructures)
accountsRoutes.post("/feeStructure/saveFeeStructure", saveFeeStructure)

export default accountsRoutes
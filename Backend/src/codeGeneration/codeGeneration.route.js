import { Router } from "express"
import { generateSRN, generatePRN, generateEN } from "./codeGeneration.controller.js"

const codegenerationRouter = Router()

codegenerationRouter.get("/generateEN", generateEN)
codegenerationRouter.get("/generateSRN", generateSRN)
codegenerationRouter.get("/generatePRN", generatePRN)

export default codegenerationRouter
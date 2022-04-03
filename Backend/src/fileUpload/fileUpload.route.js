import { Router } from "express"
import { getFile, saveFiles } from "./fileUpload.controller.js"

const uploadRouter = Router()

uploadRouter.post("/savefiles", saveFiles)
uploadRouter.get("/getfile", getFile)

export default uploadRouter
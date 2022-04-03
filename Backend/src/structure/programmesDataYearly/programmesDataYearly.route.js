import { Router } from "express"

import { create, read, find, update, remove } from "./programmesDataYearly.controller.js"

const programmesDataYearlyRouter = Router()

programmesDataYearlyRouter.post("/", create)
programmesDataYearlyRouter.get("/", read)
programmesDataYearlyRouter.get("/:id", find)
programmesDataYearlyRouter.patch("/:id", update)
programmesDataYearlyRouter.delete("/:id", remove)

export default programmesDataYearlyRouter
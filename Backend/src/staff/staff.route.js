import { Router } from "express"

import { create, read, find, findByEn, update, updateByEN, remove } from "./staff.controller.js"

const staffRoutes = Router()

staffRoutes.get("/", read)
staffRoutes.post("/", create)
staffRoutes.get("/:id", find)
staffRoutes.get("/findByEn/:employmentNumber", findByEn)
staffRoutes.patch("/:id", update)
staffRoutes.post("/updateByEN", updateByEN)
staffRoutes.delete("/:id", remove)

export default staffRoutes
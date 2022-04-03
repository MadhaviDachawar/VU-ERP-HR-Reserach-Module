import { Router } from "express"

import { create, read, find, update, updateBySrn, remove, findBySrn } from "./student.controller.js"

const studentRoutes = Router()

studentRoutes.get("/", read)
studentRoutes.post("/", create)
studentRoutes.get("/:id", find)
studentRoutes.get("/findBySrn/:srn", findBySrn)
studentRoutes.patch("/:id", update)
studentRoutes.post("/updatebysrn", updateBySrn)
studentRoutes.delete("/:id", remove)

export default studentRoutes
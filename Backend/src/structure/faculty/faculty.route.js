import { Router } from "express"

import { create, read, find, update, remove } from "./faculty.controller.js"

const facultyRouter = Router()

facultyRouter.post("/", create)
facultyRouter.get("/", read)
facultyRouter.get("/:id", find)
facultyRouter.patch("/:id", update)
facultyRouter.delete("/:id", remove)

export default facultyRouter

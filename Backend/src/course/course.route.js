import { Router } from "express"

import { create, read, find, update, remove } from "./course.controller.js"

const courseRoutes = Router()

courseRoutes.get("/", read)
courseRoutes.post("/", create)
courseRoutes.get("/:id", find)
courseRoutes.patch("/:id", update)
courseRoutes.delete("/:id", remove)

export default courseRoutes

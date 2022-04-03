import { Router } from "express"

import { create, read, find, update, remove } from "./school.controller.js"

const schoolRouter = Router()

schoolRouter.post("/", create)
schoolRouter.get("/", read)
schoolRouter.get("/:id", find)
schoolRouter.patch("/:id", update)
schoolRouter.delete("/:id", remove)

export default schoolRouter

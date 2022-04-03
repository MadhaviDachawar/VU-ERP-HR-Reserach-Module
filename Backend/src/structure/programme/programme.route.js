import { Router } from "express"

import { create, read, find, update, remove } from "./programme.controller.js"

const programmeRouter = Router()

programmeRouter.post("/", create)
programmeRouter.get("/", read)
programmeRouter.get("/:id", find)
programmeRouter.patch("/:id", update)
programmeRouter.delete("/:id", remove)

export default programmeRouter

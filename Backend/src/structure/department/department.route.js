import { Router } from "express"

import { create, read, find, update, remove } from "./department.controller.js"

const departmentRouter = Router()

departmentRouter.post("/", create)
departmentRouter.get("/", read)
departmentRouter.get("/:id", find)
departmentRouter.patch("/:id", update)
departmentRouter.delete("/:id", remove)

export default departmentRouter

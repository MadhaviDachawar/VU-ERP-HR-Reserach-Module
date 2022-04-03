import express from "express"

import userRoutes from "./user/user.route.js"
import studentRoutes from "./student/student.route.js"
import staffRoutes from "./staff/staff.route.js"
import courseRoutes from "./course/course.route.js"
import uploadRouter from "./fileUpload/fileUpload.route.js"

import universityStructureRouter from "./structure/universityStructure/universityStructure.route.js"
import facultyRouter from "./structure/faculty/faculty.route.js"
import schoolRouter from "./structure/school/school.route.js"
import departmentRouter from "./structure/department/department.route.js"
import programmeRouter from "./structure/programme/programme.route.js"
import programmesDataYearlyRouter from "./structure/programmesDataYearly/programmesDataYearly.route.js"

import codegenerationRouter from "./codeGeneration/codeGeneration.route.js"
import metaDataRouter from "./metaData/metaData.route.js"
import accountsRoutes from "./accounts/accounts.route.js"

var app = express.Router()

var Routes = [
    app.use("/users", userRoutes),
    app.use("/students", studentRoutes),
    app.use("/staffs", staffRoutes),
    app.use("/courses", courseRoutes),
    app.use("/faculties", facultyRouter),
    app.use("/schools", schoolRouter),
    app.use("/departments", departmentRouter),
    app.use("/programmes", programmeRouter),
    app.use("/programmesDataYearly", programmesDataYearlyRouter),
    app.use("/files", uploadRouter),
    app.use("/codegeneration", codegenerationRouter),
    app.use("/universitystructure", universityStructureRouter),
    app.use("/metaData", metaDataRouter),
    app.use("/accounts", accountsRoutes)
]

export default Routes
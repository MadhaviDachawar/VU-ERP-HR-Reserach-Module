import { Router } from "express"
import { login, generateOTP, resetPassword } from "./user.controller.js"

const userRoutes = Router()

userRoutes.post("/", login)
userRoutes.post("/resetpassword", generateOTP)
userRoutes.put("/resetpassword", resetPassword)

// addUser({
//      userName: "20210001",
//      userType: 1,
//      name: {firstName: "Kent", middleName: "X", lastName: "Dean"},
//      email: ['noreply.vupune@gmail.com']
// })

// addUser({
//      userName: "20210002",
//      userType: 2,
//      name: {firstName: "Clark", middleName: "B", lastName: "Hod"},
//      email: ['noreply.vupune@gmail.com']
// })

// addUser({
//      userName: "20210003",
//      userType: 3,
//      name: {firstName: "Kent", middleName: "X", lastName: "Coordinator"},
//      email: ['noreply.vupune@gmail.com']
// })

// addUser({
//      userName: "20210004",
//      userType: 4,
//      name: {firstName: "Kent", middleName: "X", lastName: "Classteacher"},
//      email: ['noreply.vupune@gmail.com']
// })

// addUser({
//      userName: "20210005",
//      userType: 5,
//      name: {firstName: "Kent", middleName: "X", lastName: "Facultyteacher"},
//      email: ['noreply.vupune@gmail.com']
// })

// addUser({
//      userName: "20210006",
//      userType: 6,
//      name: {firstName: "Kent", middleName: "X", lastName: "Cr"},
//      email: ['noreply.vupune@gmail.com']
// })

// addUser({
//      userName: "20210007",
//      userType: 7,
//      name: {firstName: "Kent", middleName: "X", lastName: "Student"},
//      email: ['noreply.vupune@gmail.com']
// })

export default userRoutes
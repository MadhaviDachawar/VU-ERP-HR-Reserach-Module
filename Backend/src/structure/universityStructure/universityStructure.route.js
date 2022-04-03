import { Router } from "express"

import { create, read, find, update, remove } from "./universityStructure.controller.js"

const universityStructureRoutes = Router()

universityStructureRoutes.get("/", read)
universityStructureRoutes.post("/", create)
universityStructureRoutes.get("/:id", find)
universityStructureRoutes.patch("/:id", update)
universityStructureRoutes.delete("/:id", remove)

export default universityStructureRoutes

// db.structure.insert([{
//     college: [
//         {
//             name: "Vishwakarma University",
//             establishedOn: '10/10/2017',
//             location: "Kondhwa, Pune",
//             streamsOffered: [
//                 {
//                     code: 'S&T',
//                     name: 'Science and Technology',
//                     type: 'Faculty',
//                     vision: 'abc',
//                     mission: 'def',
//                     manager: 'ghi',
//                     post: '',
//                     goals: '',
//                     children: [
//                         {
//                             code: 'E&T',
//                             name: 'Engineering and Technology',
//                             type: 'School',
//                             vision: 'abc',
//                             mission: 'def',
//                             manager: 'ghi',
//                             post: 'asdfsadf',
//                             goals: '',
//                             children: [
//                                 {
//                                     code: 'CE',
//                                     name: 'Computer Engineering',
//                                     type: 'Department',
//                                     vision: 'abc',
//                                     mission: 'def',
//                                     manager: 'ghi',
//                                     post: '',
//                                     goals: '',
//                                     children: [
//                                         {
//                                             code: 'BTECHCS',
//                                             name: 'BTECH Computer Engineering',
//                                             type: 'Programme',
//                                             vision: 'abc',
//                                             mission: 'def',
//                                             manager: 'abc kumar yadav',
//                                             post: 'pewdpi',
//                                             goals: 'sss',
//                                             duration: '4 Years',
//                                         },
//                                         {
//                                             code: 'BTECHAIDS',
//                                             name: 'BTECH Artificial Intelligence and Data Science',
//                                             type: 'Programme',
//                                             vision: 'abc',
//                                             mission: 'def',
//                                             manager: 'ghi',
//                                             post: '',
//                                             goals: '',
//                                             pattern: '2017',
//                                             duration: '4 Years',
//                                         }
//                                     ]

//                                 },
//                                 {
//                                     code: '',
//                                     name: 'Statistics and Mathematics',
//                                     type: 'Department',
//                                     vision: 'abc',
//                                     mission: 'def',
//                                     manager: 'ghi',
//                                     post: '',
//                                     goals: '',
//                                     children: [
//                                         {
//                                             code: '',
//                                             name: 'BSC Statistics',
//                                             type: 'Programme',
//                                             vision: 'abc',
//                                             mission: 'def',
//                                             manager: 'ghi',
//                                             post: '',
//                                             goals: '',
//                                             pattern: '2017'
//                                         },
//                                         {
//                                             code: '',
//                                             name: 'MSC Statistics',
//                                             type: 'Programme',
//                                             vision: 'abc',
//                                             mission: 'def',
//                                             manager: 'ghi',
//                                             post: '',
//                                             goals: '',
//                                         }
//                                     ]
//                                 }
//                             ]
//                         },
//                     ]
//                 }
//             ]
//         }
//     ]
// }])
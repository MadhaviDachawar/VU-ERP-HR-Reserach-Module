import util from "util"
import multer from "multer"

let storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "../../uploads/")
	},
	filename: (req, file, cb) => {
		console.log(file.originalname)
		let fname = new Date().toISOString()
		cb(null, fname)
	},
})

let uploadFile = multer({
	storage: storage,
}).single("file")

let uploadMiddleWare = util.promisify(uploadFile)

export default uploadMiddleWare

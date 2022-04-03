import path from "path"
import fs from "fs"

var __dirname = path.resolve()

function saveInUploadsFolder(fileToBeSaved) {
    fileToBeSaved.mv(`${__dirname}/Uploads/${fileToBeSaved.name}`, err => {
        if (err) {
            return err
        }
    });
}

export const saveFiles = async (req, res) => {
    try {
        if (req.files != null) {

            if (req.files.files.length == undefined) {
                saveInUploadsFolder(req.files.files)
            } else {
                for (const file of req.files.files) {
                    saveInUploadsFolder(file)
                }
            }
        }

        res.status(200).json({
            message: "File api being called successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const getFile = async (req, res) => {
    try {
        console.log(req.query.filename)
        res.sendFile(path.resolve(__dirname + '/Uploads/' + req.query.filename));
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
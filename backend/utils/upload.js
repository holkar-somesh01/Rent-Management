const multer = require("multer")
const path = require("path")
const uui = require('uuid')

const Storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const fn = Date.now() + path.extname(file.originalname)  // photo.png // 3865783456.png
        cb(null, fn)
    }
})
const Upload = multer({ storage: Storage }).fields([
    { name: "photo", maxCount: 1 },
    { name: "images", maxCount: 5 },
    { name: "documents", maxCount: 5 },
    { name: "other", maxCount: 5 },
])
// const Upload = multer({ storage: Storage }).single('hero')
module.exports = { Upload }
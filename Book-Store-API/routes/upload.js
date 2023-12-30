const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../images"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedTypes.test(file.mimetype);
    if (ext && mimeType) {
        return cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPEG, JPG, and PNG files are allowed."));
    }
};

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024 * 1024 * 5}, // 5MB file size limit
    fileFilter: fileFilter
});

/**
 * Upload image
 * @route POST /upload
 **/
router.post("/upload", upload.single("image"), (req, res) => {
    res.status(200).json({message: "Image uploaded successfully"});
});

module.exports = router;

import multer from "multer";

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

function fileFilter(req, file, cb) {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("File must be PDF"), false);
    }
}

export const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter 
});

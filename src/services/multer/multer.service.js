import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/files");
    },
    filename: (req, file, cb) => {
        file && cb(null, uuidv4() + file.originalname);
    }
});

export const upload = multer({ storage: storage });
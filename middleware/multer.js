import multer from 'multer';
import path from 'path';

// Set storage options for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './filefolder'); // Path to store CVs
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Maintain the file extension
    }
});

// Multer middleware to handle file upload
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB limit for CVs
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = /pdf/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (mimeType && extName) {
            return cb(null, true);
        } else {
            cb(new Error('Only .pdf files are allowed!'));
        }
    }
});

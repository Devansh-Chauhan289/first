import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("Multer Middleware: Setting destination for file upload."); // Log destination
        cb(null, 'uploads/'); // Ensure the destination folder exists
    },
    filename: function (req, file, cb) {
        console.log("Multer Middleware: Setting filename:", file.originalname); // Log filename
        cb(null, Date.now() + '-' + file.originalname); // Generate a unique filename
    }
});

const upload = multer({ storage: storage });

export { upload };
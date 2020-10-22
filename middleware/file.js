const multer = require('multer');
const uuid = require('uuid/v4');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'cv');
    },
    filename(req, file, cb) {
        cb(null, uuid() + '-' + file.originalname);
    }
});

const allowedTypes = ['application/pdf', 'image/jpg', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

module.exports = multer({
    storage,
    fileFilter
});
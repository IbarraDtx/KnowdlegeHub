const multer = require('multer');
const path = require('path');

//Nuestra función para almacenar los archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'));
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

//Filtrar los archivos permitidos
const fileFilter = (req, file, cb) => {
    const allowedTypes = [ 'application/pdf', 'image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'video/mp4', 'text/plain', 'application/msword' ];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Tipo de archivo no permitido'), false);
    }
};
 
const upload = multer({ storage, fileFilter });

module.exports = upload;
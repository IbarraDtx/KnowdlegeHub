const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require("dotenv").config();

//Nuestra función para almacenar los archivos
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        resource_type: 'auto',
    },
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
const cloudinary = require("../configs/cloudinary")

const cloudupload = async(path) => {
    const res = await cloudinary.uploader.upload(path)
    return res.secure_url
}

module.exports = cloudupload
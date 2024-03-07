
const cloudinary = require("cloudinary").v2
          
cloudinary.config({ 
  cloud_name: 'dini05ilk', 
  api_key: '791521924677624', 
  api_secret: process.env.CLOUDINARY_SECRET, 
});

module.exports = cloudinary
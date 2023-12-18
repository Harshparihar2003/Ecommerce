const cloudinary = require("cloudinary");

cloudinary.config({ 
    cloud_name: 'dlfdg4gil', 
    api_key: '679341145166464', 
    api_secret: 'BTXUVu90j9818omAcAhWTS-ieGo' 
  });

  const  cloudinaryUploadImg = async(fileToUpload) => {
    try{
      return await new Promise((resolve)=>{
        cloudinary.uploader.upload(fileToUpload,(result)=>{
          console.log("Cloudinary upload successful")
          console.log(result.secure_url)
            resolve(
                {
                    url : result.secure_url,
                },{
                    resource_type : "auto"
                }
            )
        })
    })
    
    }
   catch(err){
    throw new Error(err)
   }
  }

  module.exports = {cloudinaryUploadImg}
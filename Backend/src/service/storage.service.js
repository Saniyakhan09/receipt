const ImageKit = require('imagekit')
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.URL_ENDPOINT,
});


async function uploadfile(fileBuffer,filename){
    const response = await imagekit.upload({
        file: fileBuffer,
        fileName: filename,
        folder:"receipts"
    })
    return response;
   
}
module.exports = uploadfile
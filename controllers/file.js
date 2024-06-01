const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const FileModal = require('../models/file')
const mailservice = require('../services/mailService')


const uploadDirectoryPath = path.join(__dirname, '..', 'files');
console.log(uploadDirectoryPath);

const storage = multer.diskStorage({
    destination : (req,file, cd)=>{
        cd(null, uploadDirectoryPath)
    },

    filename : (req,file, cd)=>{
        const fileName = uuidv4() + path.extname(file.originalname);
        cd(null, fileName)
    }
})

const upload = multer({
    storage,
}).single('file') //field name

const uploadFile = async (req, res)=>{
    upload(req, res, async (err)=>{
        console.log(req.file)

         if(err){
            console.log(err);
         }
         const newFile = new FileModal({
            originalName : req.file.originalname,
            newFileName : req.file.filename,
            path : req.file.path

         })
         const newlyInsertedFile = await newFile.save()

        //  console.log(req.file);
         res.json({
            message : "file upload successfully",
            id : newlyInsertedFile._id,
        })
    })
}

const generateSharableLink = async (req, res)=>{
   try{
    const fileId = req.params.uuid;
    const file = await FileModal.findById(fileId);
    if(!file){
        return res.status(404).json({
            success: false,
            message: "file with given id not found"
        })
    }
    res.json({
        message : "sharable link generated successfully",
        result : "http://localhost:8080/files/download/" + fileId,
    })
   }catch(err){
    res.json({
        success : false,
        message : "somthing went wrong , please try again somtime"
    })
   }
}

const downloadFile = async (req, res)=>{
    try{
        const fileId = req.params.uuid;
        const file = await FileModal.findById(fileId);
        if(!file){
            return res.end("file with given id not found")
        }
        res.download(file.path, file.originalName)
       }catch(err){
        res.json({
            success : false,
            message : "somthing went wrong , please try again somtime"
        })
       }
}

const sendFile = async (req, res)=>{
    console.log(req.body);
    const {fileId, shareTo} = req.body;
    const downloadableLink = "http://localhost:8080/files/download/" + fileId;

    const info = await mailservice.sendMail({
        from : "do-not-reply@gmail.com",
        to : shareTo,
        subject : "A new file has been shared from file sharing platfrom",
        html : `
      <a href="${downloadableLink}">link</a>
        `
    })

    res.json({
        message : "file send successfully"
    })
}


const fileControllers = {
    uploadFile,
    generateSharableLink,
    downloadFile,
    sendFile,
}

module.exports = fileControllers;
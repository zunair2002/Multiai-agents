import fs from 'fs'
import path from 'path'
import multer from 'multer'

const pdfuploaddir = path.resolve('./temp')

if(!fs.existsSync(pdfuploaddir)){
    fs.mkdirSync(pdfuploaddir,{recursive:true})
}

const Storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,pdfuploaddir)
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}_${file.originalname}`)
    }
})
const fileFilter = (req,file,cb)=>{
    if(file.mimetype === 'application/pdf'){
        cb(null,true)
    }else{
        cb(new Error('Only PDF files are allowed'),false)
    }
}

export default multer({
    storage:Storage,
    fileFilter,
    fileSize:1024*1024*20
})

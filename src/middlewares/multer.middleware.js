import multer from "multer";
//we are using here multer to accept Img, pdf,video
//"Jo file client upload karega, usko server ke disk/folder mein kaise save karna hai?"
const storage = multer.diskStorage({
    destination:function(req,file,cd){
        //save this file in this location
        cd(null,'./public/temp')
    },
    filename:function(req,file,cd){
        cd(null,file.originalname)
    }
})
export const upload = multer({
    storage,
})
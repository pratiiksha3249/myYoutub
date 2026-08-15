// import { Promise } from "mongoose"

// const asyncHandler = (requestHandler) =>{

//     (req,res,next)=>{
//         Promise.resolve(requestHandler(req,res,next)).
//         catch((err)=>next(err))
//     }
// }
// export {asyncHandler}




// const asyncHandler = (func)=>{}
// const asyncHandler = (func)=>()=>()
// const asyncHandler = (func)=> async ()=>()

const asyncHandler = (fn) => async (req,res,next)=>{
    try{
        console.log(req);
          await fn(req,res,next)
          
    }catch(error){
        console.log(req.body,error);
         res.status(error.code || 500).json({
            success:false,
            message:error.message
         })
    }
}
export {asyncHandler}
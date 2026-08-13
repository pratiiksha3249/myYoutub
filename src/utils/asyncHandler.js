// import { Promise } from "mongoose"

// const asyncHandler = (requestHandler) =>{

//     (req,res,next)=>{
//         Promise.resolve(requestHandler(req,res,next)).
//         catch((err)=>next(err))
//     }
// }
// export {asyncHandler}



import { Promise } from "mongoose"
// const asyncHandler = (func)=>{}
// const asyncHandler = (func)=>()=>()
// const asyncHandler = (func)=> async ()=>()

const asyncHandler = (fn) => async (req,res,next)=>{
    try{
          await fn(req,res,next)
    }catch(error){
         res.status(error.code || 5000).json({
            success:false,
            message:err.message
         })
    }
}
export {asyncHandler}
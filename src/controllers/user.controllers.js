  //controller user register
    //get user details from frontend
    //validation-not empty
    //check if user already exists:username,email
    //check for images,check for avatar
    //upload them to cloudinary,avtar
    //create user object-create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return res

    //-------------------------------------------------------
    //1)data will come from  Form and json-then we will accept data in req.body
    //2)if data will come from URL-.....


    import { asyncHandler } from "../utils/asyncHandler.js";
    import {User} from "../models/user.models.js"
    import ApiError from "./utils/ApiError"
    import {uploadOnCloudinary} from "../utils/cloudinary.js"
    import { ApiRespons } from "../utils/ApiResponse.js";
    
    
    
    const registerUser = asyncHandler(async(req,res)=>{
    console.log(req);

    //just check data is receive or not
const {fullName,email,username,password}=req.body
console.log("email:",email);

//here check any field is not empty
if([
    [fullName,email,username,password].some((field)=>field?.trim()=="")
]){
    throw new ApiError(400,"All fields are required")

}



  
if(fullName===""){
    throw new ApiError(400,"fullname is required")
}

//find exist user according username,email
 const existedUser = User.findOne({
    $or:[{ username },{ email }]
})

if(existedUser){
    throw new ApiError(409,"User with email or username already exists...")
}
  

 const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath =  req.files?.converImage[0]?.path;



 if(!avatarLocalPath){
      throw new ApiError(400,"Avatar file is required...")
 }

 const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar){
          throw new ApiError(400,"Avatar file is required...")

  }


  User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage.url || "",
    email,
    password,
    username:username.toLowerCase()
  })
const createUser = await User.findById(user._id)

//here select pass all info ,just dont give password and refreshToken
const  createdUser = await  User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createUser){

    throw new ApiError(500,"Something went wrong while registering the user...")
}

return res.status(201).json(
    new ApiRespons(200,createUser,"user registed successfully..")
)


})


export {registerUser}
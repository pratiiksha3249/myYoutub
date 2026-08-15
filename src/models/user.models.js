import mongoose,{Schema} from "mongoose";
//jwt is a bearar tokan its is work like a key, if i have that key/tokan then database send data to me 
import jwt from "jsonwebtoken"
//used to encrypt the password and decrypt the password
import bcrypt from 'bcrypt'

const userSchema = new Schema(
    {
         username:{
            type:String,
            require:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
         },  
         email:{
            type:String,
            require:true,
            unique:true,
            lowercase:true,
            trim:true,
           
         }, 
         fullName:{
            type:String,
            required:true,
            trim:true,
            index:true
         },
         avatar:{
            type:String, //cloudinary url
            required:true,
         },
         coverImage:{
            type:String, //cloudinary url
         },
         watchHistory:{
            type:Schema.Types.ObjectId,
            ref:"video"
         },
         password:{
            type:String,
            required:[true,'Password is required']
         },
         RefreshToken:{
            type:String
         }
     },{timestamps:true})


     userSchema.pre("save", async function (next) {
        if(!this.isModified("password")) return;
 //here we encrypted password             
        this.password = await bcrypt.hash(this.password,10)
     })
userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password)
} 
userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
      {
         _id:this._id,
         email:this.email,
         username:this.username,
         fullName:this.fullName
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn:process.env.ACCESS_TOKEN_EXPIRY
      }
   )
}  
userSchema.methods.generateRefreshToken = function(){

 return jwt.sign(
      {
         _id:this._id,
      
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
         expiresIn:process.env.REFRESH_TOKEN_EXPIRY
      }
   )

}  



export const User = mongoose.model("User",userSchema)
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiRespons } from "../utils/ApiResponse.js";


const registerUser = asyncHandler(async (req, res) => {

    // 1. Get user details from req.body
    const { fullName, email, username, password } = req.body;

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);


    // 2. Check required fields
    if (
        [fullName, email, username, password]
            .some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }


    // 3. Check whether user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(
            409,
            "User with email or username already exists"
        );
    }


    // 4. Get files from req.files
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;


    // 5. Avatar is required
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }


    // 6. Upload avatar to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);


    // 7. Upload cover image if provided
    let coverImage;

    if (coverImageLocalPath) {
        coverImage = await uploadOnCloudinary(coverImageLocalPath);
    }


    // 8. Check avatar upload
    if (!avatar) {
        throw new ApiError(
            400,
            "Avatar upload failed"
        );
    }


    // 9. Create user in MongoDB
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    });


    // 10. Get created user without password and refreshToken
    const createdUser = await User.findById(user._id)
        .select("-password -refreshToken");


    // 11. Check user creation
    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while registering the user"
        );
    }


    // 12. Send response
    return res.status(201).json(
        new ApiRespons(
            201,
            createdUser,
            "User registered successfully"
        )
    );

});


export { registerUser };
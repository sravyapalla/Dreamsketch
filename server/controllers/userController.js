import userModel from '../models/usermodel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const registerUser = async(req,res)=> {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.json({ success: false, message: 'Missing details' })
    }

    const salt= await bcrypt.genSalt(10)
    const hashedPassword =await bcrypt.hash(password, salt)

    const userData={
      name,
      email,
      password:hashedPassword
    }
    const newUser=new userModel(userData)
    const user=await newUser.save()
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    )

    return res.json({
      success: true,
      token,
      user: {
        name:user.name
      }
    })

  } catch (error) {
    console.log(error)
 res.json({ success: false, message:error.message })
    }
}

 const loginUser = async (req, res) =>{
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: 'User does not exist' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
     const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    )
     return res.json({
      success: true,
      token,
      user: {
        name:user.name
      }
    })
    }else{
         return res.json({ success: false, message: 'Invalid Credentials' })
    }

  } catch (error) {
    console.log(error)
 res.json({ success: false, message:error.message })
  }
}
const userCredits = async (req, res) => {
  try {
    // ✅ Pull the ID from req.userId (set by your middleware)
    const userId = req.userId;
    console.log("🔍 fetching credits for userId =", userId);

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      credits: user.creditBalance,
      user:    { name: user.name },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: error.message });
  }
};

export {registerUser,loginUser,userCredits}

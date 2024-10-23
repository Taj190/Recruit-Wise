import {registerValidation} from '../authHelper/auth.js'
import {loginModel, registerModel} from '../model/registerModel.js'
import jwt from 'jsonwebtoken' ;
export const registerController = async(req , res)=>{
  const {name , password , email , answer1 , answer2 }= req.body
  if(!name || !password || !email || !answer1 || !answer2){
    return res.status(400).json({error : "All fields are required"})
  }
  try {
    await registerValidation({name, password, email, answer1, answer2})
  } catch (error) {
    res.status(400).send({
        message:error.message
    })
    
  }

  const adminDb = await registerModel({name , password , email,answer1 , answer2})
  try {
    if(adminDb){
        res.status(200).send({
            success :true,
            message:"Registered successfully"
        })
    }
  } catch (error) {
    res.status(400).send({
        message:"Error registering while saving registration"
    })
    
  }
}

export const loginController = async(req, res)=>{
  
  const {email , password}= req.body
  if(!email ||!password){
    return res.status(400).json({error : "Email and password are required"})
  }

  const adminDb = await loginModel({email , password})

 try {
  if(adminDb){
    const payload = {id : adminDb._id}
    const token = jwt.sign(payload , process.env.JWT_SECRET_KEY  )
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      sameSite: 'None',
    
  });
    res.status(200).send({
        success :true,
        message:"Logged in successfully",
        id : adminDb._id,
        name : adminDb.name,
        email : adminDb.email ,
        token

    })
  }
 } catch (error) {
  res.status(400).send({
    message:"Error logging in while checking credentials"
  })
 }
}

export const logOutController = async (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV, // Only over HTTPS in production
      sameSite: 'strict', // Security feature
    });

    return res.send({
      status: 200,
      message: 'User logged out successfully',
    });
  } catch (error) {
    console.log(error);
    return res.send({
      status: 500,
      message: 'Error logging out',
    });
  }
};


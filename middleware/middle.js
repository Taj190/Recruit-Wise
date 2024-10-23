import jwt from 'jsonwebtoken'
import adminSchema from '../schema/adminSchema.js'
import sanitizeHtml from 'sanitize-html';

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Access token from cookies
  console.log("Token from cookie:", token);
  if (!token) return res.status(403).send({ error: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) return res.status(403).send({ error: "Failed to authenticate token" });
      req.user = { id: decoded.id }; // Store user ID in request
      next();
  });
};
export const isLoggedIn = async(req, res ,next)=>{
  console.log('Incoming Cookies:', req.cookies);
  console.log('checking' , req.cookies.token)
    try {
        if(!req.cookies.token){
            throw new Error("Not authenticated")
        }
        const token = req.cookies.token
        console.log('checking' , token)
        const data =  jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = data
        next()
    } catch (error) {
       
        res.status(401).send({error : "Not authenticated"})
    }
}
export const isAdmin = async(req , res ,next)=>{

    try {
        
        const user = await adminSchema.findById(req.user.id)
        if(!user){
            throw new Error("User not found")
        }
        if(user.role !== 1){
            throw new Error("Not authorized as admin")
        }
        next()
    } catch (error) {
        res.status(403).send({error : "Not authorized as admin"})
    }
}

export const IsEmailVaild = (req,res , next)=>{
   const {email} = req.body
   if(!email){
    return res.status(400).json({error : "Email is required"})
   }
   const emailRegex = /^\S+@\S+\.\S+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address' });
  }
  next();
}
// middleware/validateMessage.js


export const ValidateMessage = (req, res, next) => {
  const { message } = req.body;
  const maxWords = 150; 

  // Check if the message exceeds the word limit
  const wordCount = message.trim().split(/\s+/).length; 
  if (wordCount > maxWords) {
    return res.status(400).json({ error: `Message should not exceed ${maxWords} words` });
  }

  // Sanitize the message to remove any malicious content
  const sanitizedMessage = sanitizeHtml(message, {
    allowedTags: [], // No HTML tags are allowed
    allowedAttributes: {}, // No attributes are allowed
  });

  // If the sanitized message is different from the original message, it means it contained unsafe content
  if (sanitizedMessage !== message) {
    return res.status(400).json({ error: 'Message contains potentially harmful content' });
  }

  // Replace the original message with the sanitized version
  req.body.message = sanitizedMessage;

  next(); // Proceed to the next middleware or route handler
};



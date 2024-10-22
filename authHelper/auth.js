import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv'
dotenv.config();
export const encyrptPassword = async (password) =>{
   try {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS , 10)
    const salt = await bcryptjs.genSalt(saltRounds);
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
   } catch (error) {
     console.error('Error encrypting password:', error);
   }
}
export const comparePassword = async(password , hashPassword)=>{
   try {
    const result = await bcryptjs.compare(password, hashPassword);
    return result;
   } catch (error) {
    console.error('Error comparing password:', error);
   }
}
const emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{6,20}$/;

const emailValidation = (email)=>{
  if(!email){
    return("Email is required")
  }
  if(email.length > 254){
    return("Email should be less than or equal to 254 characters")
  }
  if(!emailRegex.test(email)){
    return("Invalid email format")
  }
  const parts = email.split("@")
  if(parts[0].length < 2 || parts[0].length >64){
    return("Invalid email format")
  }
  const domainParts = parts[1].split(".") ;
  if(domainParts.some((part)=>part.length > 63)) return false
  return true
}
export const registerValidation = async({name , email,password ,answer1 ,answer2})=>{
    if (!name) {
        throw new Error("Name is required");
    }
    if (!email) {
        throw new Error("Email is required");
    }
    if (!emailValidation(email)) {
        throw new Error("Invalid email format");
    }
    if (!password) {
        throw new Error("Password is required");
    }
    if (!passwordPattern.test(password)) {
        throw new Error("Invalid password format");
    }
    if (!answer1 || !answer2 ) {
        throw new Error("Answer is required");
    }
    if (answer1 == answer2) {
        throw new Error("Answers should not match with each other");
    }
    return true
    

}





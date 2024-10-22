import adminSchema from "../schema/adminSchema.js"
import {comparePassword, encyrptPassword }from '../authHelper/auth.js'
export const registerModel = async ({name , email, password,answer1,answer2})=>{

    try {
        const existingAdmin = await adminSchema.findOne({email:email})
        
        if(existingAdmin){
            throw new Error("Email already exists")
        }
        const hash = await encyrptPassword(password)
        const hashAnswer1 = await   encyrptPassword(answer1)
        const hashAnswer2 = await  encyrptPassword(answer2)
        const newAdmin =  new adminSchema({
          name,
          email,
          password:hash,
          answer1:hashAnswer1,
          answer2:hashAnswer2

        })
    await newAdmin.save()
    return newAdmin
    } catch (error) {
        console.error(error,'error while saving in database')
        throw error
        
    }
}

export const loginModel = async ({email , password})=>{
    try {
        const existingAdmin = await adminSchema.findOne({email:email})
        if(!existingAdmin){
            throw new Error("No user found with this email")
        }
        const isMatch = await comparePassword(password , existingAdmin.password)
        if(!isMatch){
            throw new Error("Invalid password")
        }
        return existingAdmin
    } catch (error) {
        console.error(error,'error while login')
        throw error
        
    }
}

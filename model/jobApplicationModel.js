import Applicant from "../schema/dataSubmissionSchema.js"

export const updateUser = async({id, name, email, phone, taxNumber , address})=>{
    if(!id){
        throw new Error('please provide vaild user')
    }
    if (!name && !email && !phone && !taxNumber && !address) {
        throw new Error("At least one field is required to update the user.");
      }
    try {
        const user = await Applicant.findByIdAndUpdate(
          id,
           {name , email , phone , taxNumber , address},
           { new: true, runValidators: true }
        )
        if (!user) {
            throw new Error("User not found")
        }
       
        return user

  
    } catch (error) {
        console.error("Error updating user:", error.message);
        throw new Error(error.message || "Error updating user."); // Throw the error so it can be handled by the caller
      }
    
}   
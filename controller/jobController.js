import { updateUser } from "../model/jobApplicationModel.js"
import Applicant from "../schema/dataSubmissionSchema.js"
import fs from 'fs';
import path from 'path';

export const getUserDataController = async (req, res) => {
    const { page , limit = 10, name } = req.query; 
    const query = {};
  
    if (name) {
      query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
    }
  
    const LIMIT = Number(limit);
    const SKIP = Number((page - 1) * LIMIT);
  
    try {
      const db = await Applicant.find(query)
        
        .limit(LIMIT) // Use LIMIT instead of limit for consistency
        .skip(SKIP)
        .sort({ createdAt: -1 });

  
      const totalJobs = await Applicant.countDocuments(query);
      const totalPages = Math.ceil(totalJobs / LIMIT);
    
      res.status(200).json({
        success: true,
        data: db,
        totalPages,
        currentPage: Number(page), // Include current page for frontend clarity
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get user data',
      });
    }
  };
  
export const deleteUserDataController = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the applicant to get the CV file path
        const applicant = await Applicant.findById(id);
        if (!applicant) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        const cvFilePath = applicant.cvFilePath; 
        const fullPath = path.join(process.cwd(), cvFilePath); 
        await Applicant.findByIdAndDelete(id);
        if (fs.existsSync(fullPath)) { // Check if the file exists
            fs.unlink(fullPath, (err) => {
                if (err) {
                    console.error(`Failed to delete file: ${fullPath}`, err);
                } else {
                    console.log(`Successfully deleted file: ${fullPath}`);
                }
            });
        } else {
            console.log(`File does not exist: ${fullPath}`);
        }

        res.send({
            success: true,
            message: "User data deleted successfully",
        });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send({
            success: false,
            message: "Failed to delete user data",
            error: error.message, // Optional: send error message for debugging
        });
    }
};

export const editUserDataController = async (req, res)=>{
    const {id}=req.params
    const{taxNumber, name , email , phone , address} =req.body;
  
    try {
        if(!taxNumber || !name || !email || !phone|| !address ||(taxNumber.length < 9 ||taxNumber.length >9)){
            return res.status(400).send({
                message:'invaild inputs has been added please check your data'
            })
        }
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: 'An error occurred while submitting the data.', error });
    }
    const user = await updateUser({id, name, email, phone, address, taxNumber}) ;
   
 try {
    if(user){
        
        res.send({
            success:true ,
            message:"User data updated successfully",
            user
        })
    }
 } catch (error) {
    res.send({
        success:false ,
        message:"Failed to update user data"
    })
 }
}
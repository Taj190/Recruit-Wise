
import JobApplication from "../schema/jobApplicationSchema.js";
import Category from "../schema/jobCategorySchema.js";
import fs from 'fs';
import path from 'path';

// Controller to handle job application submission
export const jobApplicationController = async (req, res) => {
    try {
        const { category, taxNumber, name, email, phoneNumber, address } = req.body;
        const cv = req.file; // Access the uploaded file
        
        // Check if CV file is provided
        if (!cv) {
            return res.status(400).json({ message: 'CV file is required.' });
        }
        
        // Validate input fields
        if (!taxNumber || !name || !email || !phoneNumber || !address || (taxNumber.length !== 9)) {
            return res.status(400).send({
                message: 'Invalid inputs. Please check your data.'
            });
        }
        
        // Check for existing applicants
        const existingApplicant = await JobApplication.findOne({
            $or: [{ taxNumber: taxNumber }, { email: email }]
        });
        
        if (existingApplicant) {
            if (existingApplicant.taxNumber === taxNumber) {
                return res.status(400).json({ message: "Your application has already been applied. Please wait for a response." });
            }
            if (existingApplicant.email === email) {
                return res.status(400).json({ message: "An application with this email already exists. Please use a different email." });
            }
        }

        // Check if the category exists by name
        const existingCategory = await Category.findOne({ name: category });
        if (!existingCategory) {
            return res.status(400).json({ message: 'Invalid job category.' });
        }

        // Create a new job application
        const newJobApplication = new JobApplication({
            category: existingCategory._id, // Use the ID of the found category
            taxNumber,
            name,
            email,
            phoneNumber,
            address,
            cvFilePath: req.file.filename, // Save the file path to the database
        });
        console.log(`CV file saved at: ${req.file.path}`);
        console.log(`CV file saved at: ${req.file.name}`);

        // Save the new job application
        await newJobApplication.save();
        res.status(201).json({ message: 'Job application submitted successfully!' });
    } catch (error) {
        console.error('Error submitting job application:', error);
        res.status(500).json({ message: 'An error occurred while submitting the application.', error });
    }
};


export const getApplicationsController = async (req, res)=>{
    const {page  , limit = 10 , category, name} =req.query

    const query = {}
    if(name){
    query.name = {$regex: name, $options: 'i'}
   }
  
   if (category) {
    const existingCategory = await Category.findOne({ name: { $regex: `^${category}$`, $options: 'i' } });
    if (existingCategory) {
        query.category = existingCategory._id; // Use the ID of the found category
    } else {
        return res.status(400).json({ error: "Invalid category" });
    }
}

    const LIMIT = Number(limit)
    const SKIP = Number((page - 1) * LIMIT)
   
    try {
        const data = await JobApplication.find(query)
        .select('category name createdAt address cvFilePath  phoneNumber taxNumber email')
        .populate('category') 
        .limit(LIMIT)
        .skip(SKIP)
        .sort({ createdAt: -1 }); 
        const totalApplications = await JobApplication.countDocuments(query);
        const totalPages = Math.ceil(totalApplications / LIMIT)
        res.json({ 
            success: true,
            data,
            totalPages,
           
          });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching applications.', error });
        
  
        
    }
}

export const deleteApplicationsController = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the applicant to get the CV file path
        const applicant = await JobApplication.findById(id);
        if (!applicant) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        
        // Use the cvFilePath directly
        const cvFilePath = applicant.cvFilePath; 

        // Log the CV file path for debugging
        console.log(`CV file path to delete: ${cvFilePath}`);

        await JobApplication.findByIdAndDelete(id);

        // Check if the file exists
        if (fs.existsSync(cvFilePath)) {
            fs.unlink(cvFilePath, (err) => {
                if (err) {
                    console.error(`Failed to delete file: ${cvFilePath}`, err);
                } else {
                    console.log(`Successfully deleted file: ${cvFilePath}`);
                }
            });
        } else {
            console.log(`File does not exist: ${cvFilePath}`);
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
}


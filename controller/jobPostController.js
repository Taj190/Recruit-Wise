import { jobModel } from "../model/jobModel.js";
import Applicant from "../schema/dataSubmissionSchema.js";
import Category from "../schema/jobCategorySchema.js";
import Job from "../schema/jobSchema.js";
import slugify from 'slugify';
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);
export const createJobController = async(req, res)=>{
    const {category,title , description , location, requirement}= req.body ;
    if(!title ||!description ||!location ||!requirement ||!category){
        return res.status(400).json({error : "All fields are required"})
    }
    try {
        const slug = slugify(title, {lower: true})
        const jobDb = await jobModel({title , description , location, requirement,category , slug}) ;

        if(jobDb){
            const applicants = await Applicant.find({}, 'phone');
            const phoneNumbers = applicants.map(applicant => applicant.phone);
            const jobMessage = `New job alert! Recruit-Wise have a following job slot:
             Title: ${title}, Location: ${location}, Category: ${category} Requirement: ${requirement}. Apply now!`;
             
            const smsPromises = phoneNumbers.map(number => 
                twilioClient.messages.create({
                    body: jobMessage,
                     from: '+13524493874', 
                    to: number,
                })
            );


            await Promise.all(smsPromises);
            res.status(200).send({
                success :true,
                message:"Job created successfully",
                job : jobDb
            })
        }
    } catch (error) {
        console.error(error);
        res.send({
            success:false,
            message:"Error creating job while saving job",
            error
        })
        
    }
}
export const availableJobController = async(req, res)=>{
    
  const {limit= 5 , page ,title, location, category} = req.query ;
  
  const query = {} ;
  const LIMIT = Number(limit) ;
  if(title){
    query.title = {$regex: title , $options: 'i'} ;
  }

  if(location){
    query.location= {$regex: location , $options: 'i'} 
  }
 if(category){
    const categoryObj = await Category.findOne({ name: { $regex: category, $options: 'i' } })
    if (categoryObj) {
        query.category = categoryObj._id; // Use the ID of the matched category
      }
      else {
        
        return res.json({ success: true, data: [], totalPages: 0 });
      }
 }
  
  const SKIP = ((Number(page -1)) * LIMIT) ;
  try {
    const jobs = await Job.find(query)
  .select('title description location  requirement category', )
  .populate('category') 
  .skip(SKIP)
  .limit(LIMIT)
  .sort({ createdAt: -1 }); 
   
  const totalJobs = await Job.countDocuments(query)
  const totalPages = Math.ceil(totalJobs / LIMIT) ;
 
  res.json({ // Use res.json() to send JSON response
    success: true,
    data: jobs,
    totalPages,
   
  });
  } catch (error) {
    res.send({
        success:false,
        message:"Error fetching available job data",
        error
    })
  }
 
}
export const deleteJobController = async(req, res)=>{
    const { id } = req.params;
    
    try {
        const job  = await Job.findByIdAndDelete(id)
        if(job){
            res.status(200).send({
                success : true,
                message:"Job deleted successfully",
            })
           
        }
    } catch (error) {
        console.error(error);
        res.send({
            success:false,
            message:"Error deleting job",
            error
        })
        
    }
}
export const updateJobController = async (req, res)=>{
    const {id} = req.params ;
    const {category,title , description , location, requirement}= req.body ;
    console.log(id+'chakcinh')
    if(!category,!title ||!description ||!location ||!requirement){
        return res.status(400).json({error : "All fields are required"})
    }
    try {
        // Check if the job exists
        const existingJob = await Job.findById(id);
        if (!existingJob) {
            return res.status(404).json({ error: "Job not found" });
        }

        // Check if the category exists
        let categoryDoc = await Category.findOne({ name: category });

        // Create the category if it doesn't exist
        if (!categoryDoc) {
            categoryDoc = new Category({ name: category });
            await categoryDoc.save(); // Save the new category
        }

        // Update job with the new category ObjectId
        existingJob.category = categoryDoc._id; // Set the category to the new category's ObjectId
        existingJob.title = title; // Update other job fields
        existingJob.description = description;
        existingJob.location = location;
        existingJob.requirement = requirement;

        // Save the updated job
        const updatedJob = await existingJob.save();

        res.json({
            success: true,
            message: "Job updated successfully",
            updatedJob,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error updating job",
            error: error.message,
        });
    }
}
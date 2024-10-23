import Applicant from "../schema/dataSubmissionSchema.js"

export const ApplicantData = async ({ taxNumber, name, email, phone, address, residencyCard: isCardValid, cvFilePath }) => {
    try {
        
        const existingApplicant = await Applicant.findOne({ taxNumber });
        if (existingApplicant) {
            throw new Error("Your application has already been applied. Please wait for a response.");
        }

        
        const newApplicant = new Applicant({
            taxNumber,
            name,
            email,
            phone,
            address,
            residencyCard: isCardValid, 
            cvFilePath, 
        });

        // Save the new applicant
        await newApplicant.save();
        return newApplicant;
    } catch (error) {
        console.error('Error while checking existing applicant:', error);
        throw error; // Propagate the error to be handled by the calling function
    }
};
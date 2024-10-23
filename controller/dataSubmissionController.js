import { ApplicantData } from "../model/dataSubmissionModel.js";



export const dataSubmissionController = async (req, res) => {
    const { taxNumber, name, email, phone, address, residencyCard } = req.body;
    const cvFile = req.file; 
    const isCardValid = residencyCard === 'true'; 

    try {
        // Validate required fields
        if (!taxNumber || !name || !email || !phone || !address || (taxNumber.length !== 9)) {
            return res.status(400).send({
                message: 'Invalid inputs. Please check your data.'
            });
        }

        // Check if CV file was uploaded
        if (!cvFile) {
            return res.status(400).send({
                message: 'CV file is required.'
            });
        }

        // Pass the applicant data to the model function
        const applicantDb = await ApplicantData({
            taxNumber,
            name,
            email,
            phone,
            address,
            residencyCard: isCardValid,
            cvFilePath: cvFile.filename // Use filename instead of req.file.filename
        });

        // Check if applicant was saved successfully
        if (applicantDb) {
            return res.status(200).send({
                success: true,
                message: "Data submitted successfully."
            });
        } else {
            return res.status(500).send({
                success: false,
                message: "Failed to save applicant data."
            });
        }
    } catch (error) {
        console.error('Error occurred during data submission:', error);
        return res.status(500).json({ message: 'An error occurred while submitting the data.', error });
    }
};

import { ApplicantData } from "../model/dataSubmissionModel.js";

export const dataSubmissionController = async (req, res) => {
    const { taxNumber, name, email, phone, address, residencyCard } = req.body;
        const cvFilePath = req.file.path; 
        const isCardValid = residencyCard ? (residencyCard=== 'true') : false;
    
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
       
        const applicantDb = await ApplicantData({
            taxNumber, name,email,phone, address, 
            residencyCard:isCardValid , cvFilePath})
          try {
            if(applicantDb){
                res.status(200).send({
                    success :true,
                    message:"Data submitted successfully"
                })
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'An error occurred while saving the data.', error });
            
          } 
       
  
};

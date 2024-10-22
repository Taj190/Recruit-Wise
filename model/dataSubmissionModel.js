import Applicant from "../schema/dataSubmissionSchema.js"

export const ApplicantData = async({taxNumber, name,email,phone, address, 
    residencyCard:isCardValid , cvFilePath})=>{
        
        try{
            const existingApplicant = await Applicant.findOne({taxNumber:taxNumber})
            if(existingApplicant){
                throw new Error("Your application has already been applied wait for response")
            }
            
            const newApplicant = new Applicant({
                taxNumber,
                name,
                email,
                phone,
                address,
                residencyCard: isCardValid, // Store the boolean value
                cvFilePath,
            })
            await newApplicant.save()
            
            return newApplicant
        }catch(error){
            console.error(error,'error while checking existing applicant')
        }
    }
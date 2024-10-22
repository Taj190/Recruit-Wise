import EmployerForm from "../schema/employerRequestSchema.js";


export const EmployerFormController = async(req, res)=>{
   const {name , email , message} = req.body
   if(!name || !email || !message){
    return res.send({
        message:'Please fill in all required fields'
    })
   }
   try {
    // Create a new ContactForm entry
    const newContactForm = new EmployerForm({ name, email, message });
    await newContactForm.save();

    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'An error occurred while submitting the form' });
  }
}
import mongoose from 'mongoose';

const ConnectDb = ()=>{
    try {
         const conn = mongoose.connect(process.env.MONGO_URL)   
          
    } catch (error) {
        
         console.error('Error connecting to the database:', error);
    }
}

export default ConnectDb;
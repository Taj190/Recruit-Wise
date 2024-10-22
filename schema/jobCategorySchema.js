import mongoose from "mongoose";

// Category model
const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  });
  
  const Category = mongoose.model('Category', categorySchema);
  export default Category;
  
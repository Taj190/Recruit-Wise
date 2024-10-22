import Category from "../schema/jobCategorySchema.js";

export const createCategoryController = async (req, res)=>{
    const{name} = req.body
    if(!name){
        return res.status(400).json({error : "Name is required"})
    }
    try {
        const category = new Category({ name });
        await category.save();
        res.status(201).json(category); 
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
export const getCategoriesController = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateCategoryController = async (req, res) => {
    const { id } = req.params; // Assuming you pass the category ID in the URL
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    try {
        const category = await Category.findByIdAndUpdate(id, { name }, { new: true });
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export const deleteCategoryController = async (req, res) => {
    const { id } = req.params; // Assuming you pass the category ID in the URL

    try {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(204).send(); // No content response
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


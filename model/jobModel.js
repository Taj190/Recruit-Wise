import Job from "../schema/jobSchema.js"

export  const jobModel = async({category,title , description,  location , requirement,slug})=>{
    try {
        const job = new Job({
            category,
            title,
            description,
            location,
            requirement,
            slug
        })
        await job.save()
        return job
    } catch (error) {
        console.error(error,'error while saving in database')
        throw error
    }
}
import joi from  '@hapi/joi';

const blogSchema = joi.object({
    title:joi.string().min(5).required(),
    content: joi.string().min(10).required(),
   
})

export default blogSchema;
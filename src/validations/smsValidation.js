import joi from  '@hapi/joi';

const messageSchema = joi.object({
    name:joi.string().min(5).required(),
    email:joi.string().email().required(),
    sms: joi.string().min(10).required()
})

export default messageSchema;
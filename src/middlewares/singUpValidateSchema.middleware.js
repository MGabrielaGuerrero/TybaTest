const signUpSchema = require("../schemas/singUp.joi");

const singUpValidateSchema = async (req, res, next) => {
    try{
        await signUpSchema.validateAsync(req.body.data)
        next()
    }catch (e) {
        console.error(e.details[0].message);
        res.status(400).json({msg: e.details[0].message});
    }
}


module.exports = singUpValidateSchema
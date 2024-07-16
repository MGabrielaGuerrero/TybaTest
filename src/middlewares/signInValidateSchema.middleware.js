const signInSchema = require("../schemas/signIn.joi");


const singInValidateSchema = async (req, res, next) => {
    try{
        await signInSchema.validateAsync(req.body.data)
        next()
    }catch (e) {
        console.error(e.details[0].message);
        res.status(400).json({msg: e.details[0].message});
    }
}


module.exports = singInValidateSchema
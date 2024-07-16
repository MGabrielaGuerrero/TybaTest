const User = require("../models/user.model");


const userNonRepeat = async (req, res, next) => {
    try {
        const { mail, userName } = req.body.data;
        const mailfind = await User.findOne({ mail });
        const userNameFind = await User.findOne({ userName });
        if (mailfind || userNameFind) {
            console.error("Usuario ya registrado");
            res.status(400).json({msg:"Usuario ya Registrado"})
        }
        else next()
    } catch (e) {
        console.error(e.message);
        res.status(400).json(e.message);
    }
}

module.exports = userNonRepeat
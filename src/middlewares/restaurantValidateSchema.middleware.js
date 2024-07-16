const restaurantSchema = require("../schemas/restaurant");


const restaurantValidateSchema = async (req, res, next) => {
    try{
        await restaurantSchema.validateAsync(req.body.data)
        next()
    }catch (e) {
        console.error(e.details[0].message);
        res.status(400).json({msg: e.details[0].message});
    }
}


module.exports = restaurantValidateSchema
const Mongoose = require("mongoose")
const ClassSchema= Mongoose.Schema(
    {
        standard:Number,
        division: String
    }
);
const ClassModel = Mongoose.model("Class", ClassSchema);

module.exports = ClassModel;
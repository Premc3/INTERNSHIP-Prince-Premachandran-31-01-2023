const Mongoose = require("mongoose")
const StudentSchema= Mongoose.Schema(
    {
        name: String,
        rollNumber: Number,
        mobileNo: Number,
        classId: { type: Mongoose.Schema.ObjectId, required: true}
    }
);

const StudentModel = Mongoose.model("Students", StudentSchema);

module.exports = StudentModel;
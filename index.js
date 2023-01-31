const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
const Cors = require("cors");
const { ObjectId } = require("mongodb");
const StudentModel = require("./model/Student");
const ClassModel = require("./model/class");
const { Await } = require("react-router-dom");
const { db } = require("mongoose");
const app = new Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

Mongoose.connect(
  "mongodb+srv://Prince:12348765@cluster0.glgxktq.mongodb.net/SchoolDB?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
app.use(Cors());
app.post("/class", async (req, res) => {
  console.log(req.body);
  const newClass = new ClassModel(req.body);
  await newClass.save((error, data) => {
    if (error) {
      res.json({
        Status: "Error",
        Error: error,
      });
    } else {
      res.json({
        Status: "Success",
        Data: data,
      });
    }
  });
});
app.post("/", async (req, res) => {
  console.log(req.body);
  const newStudent = new StudentModel(req.body);
  await newStudent.save((error, data) => {
    if (error) {
      res.json({
        Status: "Error",
        Error: error,
      });
    } else {
      res.json({
        Status: "Success",
        Data: data,
      });
    }
  });
});
app.put("/update/:name", async (req, res) => {
  let studentName = req.params.name;
  let upclassid = req.body.classId;
  StudentModel.findOneAndUpdate(
    { name: studentName },
    { $set: { classId: upclassid } },
    { new: true },
    (err, data) => {
      if (data == null) {
        res.send("No Student present");
      } else {
        res.send(data);
      }
    }
  );
});
app.delete('/del/:id', function(req, res) { 
  let uid = req.params.id.toString();
  StudentModel.findById(uid, function(err, result) { 
      if (err) {
        console.log(err)
      } else {
        // res.send(result)
        let {_id} = result
        StudentModel.deleteOne({id:_id}).then(response=>{
          res.send(response)
        }).catch(err=>res.send(err))
      }
  })});
  app.delete('/delclass/:id', function(req, res) { 
    let cid = req.params.id.toString();
    ClassModel.findById(cid, function(err, result) { 
        if (err) {
          console.log(err)
        } else {
          let {_id} = result
          ClassModel.deleteOne({id:_id}).then(response=>{
            res.send(response)
          }).catch(err=>res.send(err))
        }
    });
  
})
app.get("/details", (req, res) => {
  StudentModel.aggregate([
    {
      $lookup: {
        from: "classes",
        localField: "classId",
        foreignField: "_id",
        as: "classDetails",
      },
    },
  ])
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
app.get("/allstudents/:classId", (req, res) => {
  let fetchid = req.params.classId.toString();
  StudentModel.find({classId:fetchid},
    (err, val) => {
      if (err) {
        console.log(err)
      } else {
         res.send(val) 
      }
    });
});
app.listen(3001, () => {
  console.log("Server Started");
});

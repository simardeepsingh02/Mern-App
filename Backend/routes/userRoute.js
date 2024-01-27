const express = require("express");
const router = express.Router();
const userData = require("../models/userModel");
const app =express();
const mongoose = require("mongoose");

//CREATE
router.post("/", async (req, res) => {
  console.log(req.body);
  const { name, email, age ,password} = req.body;
  try {
    const userAdded = await userData.create({
      name: name,
      email: email,
      age: age,
      password:password
    });
    res.status(201).json(userAdded);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
});

//GET
router.get("/", async (req, res) => {
    try {
      const allUsers = await userData.find().select('-password');
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

//DELETE
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await userData.findByIdAndDelete({ _id: id });
    res.status(201).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//UPDATE
router.patch("/edit/:id", async (req, res) => {
  const { id } = req.params;
  console.log("get body", req.body);
  console.log("get id", id);
  //const { name, email, age } = req.body;
  try {
    const updatedUser = await userData.findOneAndUpdate({email:id}, req.body, {
      new: true,
    });
    updatedUser.password="0";
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//GET SINGLE USER
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const singleUser = await userData.findOne({ email: id });
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//GET Login
router.get("/signin/:id/:pass", async (req, res) => {
  const { id } = req.params;
  const { pass } = req.params;
  try {
    const singleUser = await userData.findOne({ email: id });
    if(singleUser.password==pass){
      res.status(200).json({res:"Success"});
    }
    else{
      res.status(200).json({res:"Fail"});
    }
    
  } catch (error) {
    res.status(200).json({res:"WrongEmail"});
  }
});

module.exports = router;
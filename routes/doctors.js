const { Doctor, validate } = require("../models/doctor");
const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();

//GET DOCTORS
router.get("/", async (req, res) => {
  const doctors = await Doctor.find().sort("firstName");
  res.send(doctors);
});

//GET DOCTOR BY ID
router.get("/:id", async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    return res.status(404).send("Doctor not found!");
  }
  res.send(doctor);
});

//POST OR CREATE DOCTORS
router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(error.details[0].message);
  }

  let doctor = new Doctor({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    doctorType: req.body.doctorType,
  });

  doctor = await doctor.save();

  res.send(doctor);
});

//PUT OR UPDATE DOCTOR
router.put("/:id", async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(error.details[0].message);
  }

  const doctor = await Doctor.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      doctorType: req.body.doctorType,
    },
    { new: true }
  );

  if (!doctor) {
    return res.status(404).send("Doctor not found!");
  }

  res.send(doctor);
});

//DELETE DOCTOR
router.delete("/:id", async (req, res) => {
  const doctor = await Doctor.findByIdAndRemove(req.params.id);
  if (!doctor) {
    return res.status(404).send("Doctor not found!");
  }
  res.send(doctor);
});

module.exports = router;

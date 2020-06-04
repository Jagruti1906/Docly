const { Patient, validate } = require("../models/patient");
const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();

//GET PATIENTS
router.get("/", async (req, res) => {
  const patients = await Patient.find().sort("firstName");
  res.send(patients);
});

//GET PATIENT BY ID
router.get("/:id", async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (!patient) {
    return res.status(404).send("patient not found!");
  }
  res.send(patients);
});

//POST OR CREATE PATIENTS
router.post("/", async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(error.details[0].message);
  }

  let patient = new Patient({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthDate: req.body.birthDate,
  });

  patient = await patient.save();

  res.send(patient);
});
//PUT OR UPDATE PATIENTS
router.put("/:id", async (req, res) => {
  const result = validate(req.body);
  if (result.error) {
    return res.status(400).send(error.details[0].message);
  }

  const patient = await Patient.findByIdAndUpdate(
    req.params.id,
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      birthDate: req.body.birthDate,
    },
    { new: true }
  );

  if (!patient) {
    return res.status(404).send("Patient not found!");
  }

  res.send(patient);
});

//DELETE PATIENTS
router.delete("/:id", async (req, res) => {
  const patient = await Patient.findByIdAndRemove(req.params.id);
  if (!patient) {
    return res.status(404).send("Patient not found!");
  }
  res.send(patient);
});

module.exports = router;

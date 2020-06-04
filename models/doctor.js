//first name
//last name
//doctorType

const mongoose = require("mongoose");
const Joi = require("joi");

//DOCTOR SCHEMA
const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 81,
  },

  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 81,
  },

  doctorType: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 81,
  },
});

//DOCTOR SCHEMA MODEL
const Doctor = mongoose.model("Doctors", doctorSchema);

//VALIDATE FUNCTION
function validateDoctor(doctor) {
  const schema = {
    firstName: Joi.string().required().min(3).max(81),
    lastName: Joi.string().required().min(3).max(81),
    doctorType: Joi.string().required().min(3).max(81),
  };
  return Joi.validate(doctor, schema);
}

exports.doctorSchema = doctorSchema;
exports.validate = validateDoctor;
exports.Doctor = Doctor;

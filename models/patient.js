const mongoose= require('mongoose');
const Joi= require('joi');

//PATIENT SCHEMA
const patientSchema= new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 81 
    },

    lastName:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 81 
    },

    birthDate:{
        type: Date,
        required: true
    }
    //address
    //doctors:[doc1, doc2, doc3], //refernce to doctors db
    //xrays:[],
    //prescriptions:[],
    //labReports:[]
});

//PATIENT SCHEMA MODEL
const Patient= mongoose.model('Patients', patientSchema); //('mongoDBdocumentName', schemaName) 

//VALIDATE FUNCTION
function validatePatient(patient){
    const schema= {
        firstName: Joi.string().required().min(3).max(81),
        lastName: Joi.string().required().min(3).max(81),
        birthDate: Joi.date().required()
    };
    return Joi.validate(patient, schema);
}

exports.patientSchema= patientSchema;
exports.validate= validatePatient;
exports.Patient= Patient;
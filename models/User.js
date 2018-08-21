const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    // Compte
    email: String,
    password: String,

    // Personal Data
    firstName: String,
    lastName: String,    
    address: String,
    phone: String,
    certificate: String,
    situation: String,
    birth: { birthday: String, birthmonth: String, birthyear: String },
    
    // Word Data
    matricule: String,
    habilitation: String,    
    status: String,
    admition: { admitionday: String, admitionmonth: String, admitionyear: String },

    // Avatar
    file: String,
    
});

module.exports = mongoose.model('users', UserSchema);
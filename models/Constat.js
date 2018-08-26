const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConstatSchema = new Schema({

    etabliParConstat: String,
    agentConserneConstat: String,
    createConstat: { createdayConstat: String, createmonthConstat: String, createyearConstat: String },

    // Agent Conserné
    lastNameConstat: String,
    firstNameConstat: String,
    matriculeConstat: String,
    fonctionConstat: String,
    serviceAgentConstat: String,
    priseServiceConstat: String,
    finServiceConstat: String,
    motifConstat: String,

    // Explication
    resumeFaitConstat: String,
    explicationAgentConstat: String

});

module.exports = mongoose.model('constats', ConstatSchema);
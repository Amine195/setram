const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PasfSchema = new Schema({

    // Agent Conserné Hidden
    lastNamePasf: String,
    firstNamePasf: String,
    matriculePasf: String,
    fonctionPasf: String,

    // Card 1
    etabliParPasf: String,
    fonctionetabliParPasf: String,
    datePasf: { datedayPasf: String, datemonthPasf: String, dateyearPasf: String },
    momentdePasf: { momentdeheurePasf: String, momentdeminutePasf: String },
    momentaPasf: { momentaheurePasf: String, momentaminutePasf: String },
    lignePasf: String,
    numeroderamePasf: String,

    // Card 2
    motifPasf: String,
    amotifPasf: String,
    lemotifPasf: String,

    // Card 3
    uniformePasf: { okuniformePasf:Boolean, commentaireuniformePasf: String },
    cleKCPasf: { okcleKCPasf:Boolean, commentairecleKCPasf: String },
    cleservicePasf: { okcleservicePasf:Boolean, commentairecleservicePasf: String },
    badgePasf: { okbadgePasf:Boolean, commentairebadgePasf: String },

    // Card 4
    commandeitineraire: String,
    franshisementsignalrestrictif: String,
    connaissancesignaux: String,
    preceduredevantsignalrestrictif: String

});

module.exports = mongoose.model('pasfs', PasfSchema);
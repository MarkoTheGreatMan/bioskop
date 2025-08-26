"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const rezervacijaSchema = new mongoose_1.default.Schema({
    ulogovaniKorisnik: { type: String, required: true }, // username
    nazivFilma: { type: String, required: true },
    cenaKarte: { type: Number, required: true },
    termin: { type: Date, required: true },
    status: { type: String, required: true }
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('RezervacijaModel', rezervacijaSchema, 'rezervacije');

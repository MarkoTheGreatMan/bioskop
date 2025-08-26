"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const korisnikSchema = new mongoose_1.default.Schema({
    ime: { type: String, required: true },
    prezime: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefon: { type: String },
    adresa: { type: String },
    omiljeniZanrovi: [{ type: String }],
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, default: 'korisnik' } // optional: user role
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('KorisnikModel', korisnikSchema, 'korisnici');

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const recenzijaSchema = new mongoose_1.default.Schema({
    korisnik: { type: String, required: true },
    ocena: { type: Number, required: true },
    komentar: { type: String }
}, { _id: false });
const filmSchema = new mongoose_1.default.Schema({
    naziv: { type: String, required: true },
    opis: { type: String },
    zanr: { type: String },
    trajanje: { type: Number }, // minutes
    reziser: { type: String },
    glumci: [{ type: String }],
    datumIzlaska: { type: Date },
    projekcije: [{ type: Date }],
    cenaKarte: { type: Number },
    recenzije: [recenzijaSchema],
    status: {
        type: String,
        enum: ['gledano', 'rezervisano', 'otkazano'],
        default: 'rezervisano'
    }
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('FilmModel', filmSchema, 'projekcije');

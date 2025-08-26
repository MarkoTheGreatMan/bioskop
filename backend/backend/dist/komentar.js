"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const komentarSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    film: { type: String, required: true },
    ocena: { type: Number, required: true, min: 0, max: 10 },
    komentar: { type: String }
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('KomentarModel', komentarSchema, 'komentari');

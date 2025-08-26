"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    id: String,
    title: String,
    author: String,
    person: String,
    deadline: String
}, {
    versionKey: false
});
exports.default = mongoose_1.default.model('BookModel', bookSchema, 'books');

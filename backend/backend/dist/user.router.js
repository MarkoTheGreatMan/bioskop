"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const userRouter = express_1.default.Router();
userRouter.route("/registrujSe").post((req, res) => new user_controller_1.UserController().registrujSe(req, res));
userRouter.route("/login").post((req, res) => new user_controller_1.UserController().login(req, res));
userRouter.route("/updateKorisnik").post((req, res) => new user_controller_1.UserController().updateKorisnik(req, res));
userRouter.route("/sveProjekcije").get((req, res) => new user_controller_1.UserController().getAllProjekcije(req, res));
userRouter.route("/getMyRes").post((req, res) => new user_controller_1.UserController().getMyRes(req, res));
userRouter.route("/updateStatus").post((req, res) => new user_controller_1.UserController().updateStatus(req, res));
userRouter.route("/rezervisi").post((req, res) => new user_controller_1.UserController().rezervisi(req, res));
userRouter.route("/deleteRezervacija").post((req, res) => new user_controller_1.UserController().deleteRezervacija(req, res));
userRouter.route("/ostaviKomentar").post((req, res) => new user_controller_1.UserController().ostaviKomentar(req, res));
userRouter.route("/getAllKomentari").get((req, res) => new user_controller_1.UserController().getAllKomentari(req, res));
exports.default = userRouter;

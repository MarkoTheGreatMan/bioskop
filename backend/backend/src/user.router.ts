import express from 'express'
import { UserController } from './user.controller';

const userRouter = express.Router()

userRouter.route("/registrujSe").post(
    (req,res)=>new UserController().registrujSe(req,res)
)

userRouter.route("/login").post(
    (req,res)=>new UserController().login(req,res)
)

userRouter.route("/updateKorisnik").post(
    (req,res)=>new UserController().updateKorisnik(req,res)
)

userRouter.route("/sveProjekcije").get(
    (req,res)=>new UserController().getAllProjekcije(req,res)
)

userRouter.route("/getMyRes").post(
    (req,res)=>new UserController().getMyRes(req,res)
)

userRouter.route("/updateStatus").post(
    (req,res)=>new UserController().updateStatus(req,res)
)

userRouter.route("/rezervisi").post(
    (req,res)=>new UserController().rezervisi(req,res)
)

userRouter.route("/deleteRezervacija").post(
    (req,res)=>new UserController().deleteRezervacija(req,res)
)

userRouter.route("/ostaviKomentar").post(
    (req,res)=>new UserController().ostaviKomentar(req,res)
)

userRouter.route("/getAllKomentari").get(
    (req,res)=>new UserController().getAllKomentari(req,res)
)


export default userRouter;
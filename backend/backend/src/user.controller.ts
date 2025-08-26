import express from "express";
import KorisnikModel from "./korisnik";
import FilmModel from "./projekcija";
import RezervacijaModel from "./rezervacija";
import KomentarModel from "./komentar"

export class UserController {
  registrujSe = (req: express.Request, res: express.Response) => {
    const k = req.body;
    console.log(k);

    const noviKorisnik = new KorisnikModel({
      ime: k.ime,
      prezime: k.prezime,
      email: k.email,
      telefon: k.telefon || "",
      adresa: k.adresa || "",
      omiljeniZanrovi: k.omiljeniZanrovi || [],
      username: k.username,
      password: k.password,
      type: "korisnik",
    });

    noviKorisnik
      .save()
      .then((user) => {
        console.log("Registrovan korisnik:", user);
        res.json({ message: "Registracija uspešna", user });
      })
      .catch((err) => {
        console.error("Greška pri registraciji:", err);
        res
          .status(500)
          .json({ message: "Greška pri registraciji", error: err });
      });
  };

  login = (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;

    KorisnikModel.findOne({ username, password })
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({ message: "Pogrešno korisničko ime ili lozinka" });
        }
        res.json(user);
      })
      .catch((err) => {
        console.error("Greška pri prijavi:", err);
        res.status(500).json({ message: "Greška na serveru" });
      });
  };

  updateKorisnik = (req: express.Request, res: express.Response) => {
    const k = req.body;
    console.log(k);

    KorisnikModel.findOneAndUpdate(
      { username: k.username },
      {
        ime: k.ime,
        prezime: k.prezime,
        email: k.email,
        telefon: k.telefon || "",
        adresa: k.adresa || "",
        omiljeniZanrovi: k.omiljeniZanrovi || [],
        password: k.password,
      },
      { new: true }
    )
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(404).json({ message: "Korisnik nije pronađen" });
        }
        res.json({ msg: "Profil je uspešno ažuriran", user: updatedUser });
      })
      .catch((err) => {
        console.error("Greška pri ažuriranju korisnika:", err);
        res
          .status(500)
          .json({ message: "Greška pri ažuriranju korisnika", error: err });
      });
  };

  getAllProjekcije = (req: express.Request, res: express.Response) => {
    FilmModel.find()
      .then((projekcije) => {
        res.status(200).json(projekcije);
      })
      .catch((error) => {
        console.error("Greška prilikom dohvatanja projekcija:", error);
        res.status(500).json({
          message: "Došlo je do greške prilikom dohvatanja projekcija.",
          error,
        });
      });
  };

  rezervisi = (req: express.Request, res: express.Response) => {
    const r = req.body;
    console.log("Nova rezervacija:", r);

    const novaRezervacija = new RezervacijaModel({
      ulogovaniKorisnik: r.ulogovaniKorisnik,
      nazivFilma: r.nazivFilma,
      cenaKarte: r.cenaKarte,
      termin: r.termin,
      status: r.status,
    });

    novaRezervacija
      .save()
      .then((rez) => {
        console.log("Rezervacija uspešna:", rez);
        res.json({ message: "Rezervacija uspešna", rezervacija: rez });
      })
      .catch((err) => {
        console.error("Greška pri rezervaciji:", err);
        res.status(500).json({ message: "Greška pri rezervaciji", error: err });
      });
  };

  getMyRes = (req: express.Request, res: express.Response) => {
    const username = req.body.username;
    console.log(username)
    if (!username) {
      return res
        .status(400)
        .json({ message: "Nedostaje korisničko ime (username)." });
    }

    RezervacijaModel.find({ ulogovaniKorisnik: username })
      .then((rezervacije) => {
        res.status(200).json(rezervacije);
      })
      .catch((error) => {
        console.error("Greška prilikom dohvatanja rezervacija:", error);
        res.status(500).json({
          message: "Došlo je do greške prilikom dohvatanja rezervacija.",
          error,
        });
      });
  };

  updateStatus = (req: express.Request, res: express.Response) => {
  const { username, nazivFilma, termin, status } = req.body;

  RezervacijaModel.findOneAndUpdate(
    {
      ulogovaniKorisnik: username,
      nazivFilma: nazivFilma,
      termin: new Date(termin)
    },
    { status },
    { new: true }
  )
    .then((updated) => {
      if (updated) res.status(200).json({ message: 'Status ažuriran' });
      else res.status(404).json({ message: 'Rezervacija nije pronađena' });
    })
    .catch((err) => {
      console.error("Greška prilikom ažuriranja statusa:", err);
      res.status(500).json({ message: 'Greška na serveru', error: err });
    });
};

deleteRezervacija = (req: express.Request, res: express.Response) => {
  const id = req.body.id; 
  console.log(id)
  RezervacijaModel.findByIdAndDelete(id)
    .then((deletedRezervacija) => {
      if (!deletedRezervacija) {
        return res.status(404).json({ message: "Rezervacija nije pronađena." });
      }
      res.status(200).json({ message: "Rezervacija uspešno obrisana." });
    })
    .catch((error) => {
      console.error("Greška prilikom brisanja rezervacije:", error);
      res.status(500).json({
        message: "Došlo je do greške prilikom brisanja rezervacije.",
        error,
      });
    });
};

getAllKomentari = (req: express.Request, res: express.Response) => {
  KomentarModel.find()
    .then((komentari) => {
      res.status(200).json(komentari);
    })
    .catch((error) => {
      console.error("Greška prilikom dohvatanja komentara:", error);
      res.status(500).json({
        message: "Došlo je do greške prilikom dohvatanja komentara.",
        error,
      });
    });
};


ostaviKomentar = (req: express.Request, res: express.Response) => {
  const k = req.body;
  console.log("Novi komentar:", k);

  const noviKomentar = new KomentarModel({
    username: k.username,
    film: k.film,
    ocena: k.ocena,
    komentar: k.komentar,
  });

  noviKomentar
    .save()
    .then((kom) => {
      console.log("Komentar uspešno dodat:", kom);
      res.json({ message: "Komentar uspešno dodat", komentar: kom });
    })
    .catch((err) => {
      console.error("Greška pri dodavanju komentara:", err);
      res.status(500).json({ message: "Greška pri dodavanju komentara", error: err });
    });
};


  /* login = (req: express.Request, res: express.Response)=>{
        let usernameP = req.body.username;
        let passwordP = req.body.password;

        UserModel.findOne({username: usernameP, 
        password: passwordP}).then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
        }) 
    }

    getusers = (req: express.Request, res: express.Response)=>{
        UserModel.find({}).then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
        }) 
    }

    getbooks = (req: express.Request, res: express.Response)=>{
        BookModel.find({}).then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
        }) 
    }

    razduzi = (req: express.Request, res: express.Response)=>{
        BookModel.updateOne({id: req.body.id}, {person: null, deadline: null}).then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
        }) 
    }

    zaduzi = (req: express.Request, res: express.Response)=>{
        let date = new Date()
        let userp = req.body.user
        let idp = req.body.id
        let n = date.getDate() + 14
        date.setDate(n)
        let a = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
        BookModel.updateOne({id: req.body.id}, {person: userp, deadline: a}).then((user)=>{
            res.json(user)
        }).catch((err)=>{
            console.log(err)
        }) 
    }

    dodaj = (req: express.Request, res: express.Response)=>{
        let b = req.body
        new BookModel({
            id : b.i,
            title : b.n,
            author: b.a,
            person: null,
            deadline : null
        }).save().then((user)=>{
            console.log(user)
            res.json(user)
        }).catch((err)=>{
            console.log(err)
        }) 
    }*/
}

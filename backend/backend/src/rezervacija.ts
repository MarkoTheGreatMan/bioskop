import mongoose from 'mongoose';

const rezervacijaSchema = new mongoose.Schema(
  {
    ulogovaniKorisnik: { type: String, required: true }, // username
    nazivFilma: { type: String, required: true },
    cenaKarte: { type: Number, required: true },
    termin: { type: Date, required: true },
    status: { type: String, required: true }
  },
  {
    versionKey: false
  }
);

export default mongoose.model('RezervacijaModel', rezervacijaSchema, 'rezervacije');
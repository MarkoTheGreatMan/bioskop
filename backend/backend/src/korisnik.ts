import mongoose from 'mongoose';

const korisnikSchema = new mongoose.Schema(
  {
    ime: { type: String, required: true },
    prezime: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefon: { type: String },
    adresa: { type: String },
    omiljeniZanrovi: [{ type: String }],
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, default: 'korisnik' } // optional: user role
  },
  {
    versionKey: false
  }
);

export default mongoose.model('KorisnikModel', korisnikSchema, 'korisnici');

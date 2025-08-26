import mongoose from 'mongoose';

const recenzijaSchema = new mongoose.Schema(
  {
    korisnik: { type: String, required: true },
    ocena: { type: Number, required: true },
    komentar: { type: String }
  },
  { _id: false }
);

const filmSchema = new mongoose.Schema(
  {
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
  },
  {
    versionKey: false
  }
);

export default mongoose.model('FilmModel', filmSchema, 'projekcije');

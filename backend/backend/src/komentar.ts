import mongoose from 'mongoose';

const komentarSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    film: { type: String, required: true },
    ocena: { type: Number, required: true, min: 0, max: 10 },
    komentar: { type: String }
  },
  {
    versionKey: false
  }
);

export default mongoose.model('KomentarModel', komentarSchema, 'komentari');

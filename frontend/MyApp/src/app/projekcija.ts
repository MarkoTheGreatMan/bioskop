export interface Recenzija {
  korisnik: string;
  ocena: number;
  komentar?: string;
}

export class Projekcija {
  _id?: string;
  naziv: string;
  opis?: string;
  zanr?: string;
  trajanje?: number;
  reziser?: string;
  glumci?: string[];
  datumIzlaska?: Date;
  projekcije?: Date[];
  cenaKarte?: number;
  recenzije?: Recenzija[];
  status?: 'gledano' | 'rezervisano' | 'otkazano';

  constructor(
    naziv: string,
    opis?: string,
    zanr?: string,
    trajanje?: number,
    reziser?: string,
    glumci?: string[],
    datumIzlaska?: Date,
    projekcije?: Date[],
    cenaKarte?: number,
    recenzije?: Recenzija[],
    status?: 'gledano' | 'rezervisano' | 'otkazano',
    _id?: string
  ) {
    this.naziv = naziv;
    this.opis = opis;
    this.zanr = zanr;
    this.trajanje = trajanje;
    this.reziser = reziser;
    this.glumci = glumci;
    this.datumIzlaska = datumIzlaska;
    this.projekcije = projekcije;
    this.cenaKarte = cenaKarte;
    this.recenzije = recenzije;
    this.status = status;
    this._id = _id;
  }
}

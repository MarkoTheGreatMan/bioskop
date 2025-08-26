
export class Korisnik {
  ime: string;
  prezime: string;
  email: string;
  telefon: string;
  adresa: string;
  omiljeniZanrovi: string[];
  username: string;
  password: string;

  constructor(
    ime: string = '',
    prezime: string = '',
    email: string = '',
    telefon: string = '',
    adresa: string = '',
    omiljeniZanrovi: string[] = [],
    username: string = '',
    password: string = ''
  ) {
    this.ime = ime;
    this.prezime = prezime;
    this.email = email;
    this.telefon = telefon;
    this.adresa = adresa;
    this.omiljeniZanrovi = omiljeniZanrovi;
    this.username = username;
    this.password = password;
  }
}

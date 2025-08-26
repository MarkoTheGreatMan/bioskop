import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Msg } from './msg';
import { Korisnik } from './korisnik';
import { Projekcija } from './projekcija';
import { Rezervacija } from './rezervacija';
import { Komentar } from './komentar';

@Injectable({
  providedIn: 'root',
})
export class MyService {
  constructor(private http: HttpClient) {}

  registrujSe(data: {
    ime: string;
    prezime: string;
    email: string;
    telefon?: string;
    adresa?: string;
    omiljeniZanrovi: string[];
    username: string;
    password: string;
  }) {
    console.log(data);
    return this.http.post<Msg>('http://localhost:4000/registrujSe', data);
  }

  login(username: string, password: string) {
    const data = { username, password };
    console.log(data);
    return this.http.post<Korisnik>('http://localhost:4000/login', data);
  }

  updateKorisnik(korisnik: Korisnik) {
    console.log(korisnik);
    return this.http.post<Msg>(
      `http://localhost:4000/updateKorisnik`,
      korisnik
    );
  }

  sveProjekcije() {
    return this.http.get<Projekcija[]>(`http://localhost:4000/sveProjekcije`);
  }

  getMyRes(username: string) {
    const data = {
      username: username,
    };
    return this.http.post<Rezervacija[]>(
      `http://localhost:4000/getMyRes`,
      data
    );
  }

  rezervisi(rezervacija: Rezervacija) {
    console.log(rezervacija);
    return this.http.post<Msg>('http://localhost:4000/rezervisi', rezervacija);
  }

  updateStatus(rez: Rezervacija, newStatus: string) {
    const data = {
      username: rez.ulogovaniKorisnik,
      nazivFilma: rez.nazivFilma,
      termin: rez.termin,
      status: newStatus,
    };
    console.log(data);
    return this.http.post<Msg>('http://localhost:4000/updateStatus', data);
  }

  deleteRezervacija(id: string) {
    console.log(id);
    const data = {
      id: id,
    };
    return this.http.post<Msg>('http://localhost:4000/deleteRezervacija', data);
  }

  getAllKomentari() {
    return this.http.get<Komentar[]>('http://localhost:4000/getAllKomentari');
  }

  ostaviKomentar(kom: Komentar) {
    const data = {
      username: kom.username,
      film: kom.film,
      ocena: kom.ocena,
      komentar: kom.komentar,
    };
    console.log(data);
    return this.http.post<Msg>('http://localhost:4000/ostaviKomentar', data);
  }
}

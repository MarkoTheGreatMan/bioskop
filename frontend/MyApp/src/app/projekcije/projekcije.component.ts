import { Component } from '@angular/core';
import { MyService } from '../my.service';
import { Projekcija } from '../projekcija';
import { Rezervacija } from '../rezervacija';
import { Korisnik } from '../korisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projekcije',
  templateUrl: './projekcije.component.html',
  styleUrls: ['./projekcije.component.css'],
})
export class ProjekcijeComponent {
  projekcije: Projekcija[] = [];
  filt: Projekcija[] = [];

  filter = {
    naziv: '',
    opis: '',
    zanr: '',
    trajanje: null,
    reziser: '',
    glumci: '',
    datumIzlaska: '',
    datumProjekcije: '',
    cenaKarte: null,
    recenzija: '',
  };

  constructor(private projekcijaService: MyService, private router:Router) {}

  ngOnInit(): void {
    this.projekcijaService.sveProjekcije().subscribe({
      next: (data) => {
        this.projekcije = data;
        this.filt = data;
      },
      error: (err) => console.error('Greška pri dohvatanju projekcija:', err),
    });
  }

  filtriraj(): void {
  const filterDatumIzlaska = this.filter.datumIzlaska ? new Date(this.filter.datumIzlaska) : null;
  const filterDatumProjekcije = this.filter.datumProjekcije ? new Date(this.filter.datumProjekcije) : null;

  this.filt = this.projekcije.filter(p => {
    const datumIzlaskaMatch = !filterDatumIzlaska ||
      (p.datumIzlaska && this.jeIstiDatum(p.datumIzlaska, filterDatumIzlaska));

    const projekcijaMatch = !filterDatumProjekcije ||
      (p.projekcije && p.projekcije.some(d => this.jeIstiDatum(d, filterDatumProjekcije)));

    return (
      (!this.filter.naziv || p.naziv?.toLowerCase().includes(this.filter.naziv.toLowerCase())) &&
      (!this.filter.opis || p.opis?.toLowerCase().includes(this.filter.opis.toLowerCase())) &&
      (!this.filter.zanr || p.zanr?.toLowerCase().includes(this.filter.zanr.toLowerCase())) &&
      (!this.filter.trajanje || (p.trajanje ?? 0) <= this.filter.trajanje) &&
      (!this.filter.reziser || p.reziser?.toLowerCase().includes(this.filter.reziser.toLowerCase())) &&
      (!this.filter.glumci || p.glumci?.some((g: string) =>
        g.toLowerCase().includes(this.filter.glumci.toLowerCase()))) &&
      (!this.filter.cenaKarte || (p.cenaKarte ?? 0) <= this.filter.cenaKarte) &&
      (!this.filter.recenzija || p.recenzije?.some((r: any) =>
        r.komentar?.toLowerCase().includes(this.filter.recenzija.toLowerCase()))) &&
      datumIzlaskaMatch &&
      projekcijaMatch
    );
  });
}

pregledaj(film: any) {
  localStorage.setItem("film", JSON.stringify(film));
  this.router.navigate(['/pregled']);
}

rezervisi(film: any, termin: Date) {
    const korisnikString = localStorage.getItem('trenutniKorisnik');

    if (!korisnikString) {
      alert('Morate biti ulogovani da biste rezervisali kartu.');
      return;
    }

    const korisnik = JSON.parse(korisnikString);
    const rezervacija = new Rezervacija();

    rezervacija.ulogovaniKorisnik = korisnik.username;
    rezervacija.nazivFilma = film.naziv;
    rezervacija.cenaKarte = film.cenaKarte;
    rezervacija.termin = termin;
    rezervacija.status = "Rezervisano"

    console.log(rezervacija)

    this.projekcijaService.rezervisi(rezervacija).subscribe({
      next: (response) => {
        console.log('Uspešno poslato:', response);
        window.location.href = '/korpa';
      },
      error: (err) => {
        console.error('Greška pri rezervaciji:', err);
        alert('Došlo je do greške pri rezervaciji.');
      }
    });
  }


jeIstiDatum(d1: Date | string, d2: Date | string): boolean {
  const date1 = d1 instanceof Date ? d1 : new Date(d1);
  const date2 = d2 instanceof Date ? d2 : new Date(d2);

  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}
}

import { Component } from '@angular/core';
import { MyService } from '../my.service';
import { Rezervacija } from '../rezervacija';
import { Korisnik } from '../korisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-korpa',
  templateUrl: './korpa.component.html',
  styleUrls: ['./korpa.component.css'],
})
export class KorpaComponent {
  rezervacije: Rezervacija[] = [];
  sveRezervacije: Rezervacija[] = [];
  username: string = '';
  ukupnaCena: number = 0;

  constructor(private rezervacijaService: MyService, private router: Router) {}

  ngOnInit(): void {
    const korisnikString = localStorage.getItem('trenutniKorisnik');
    if (!korisnikString) {
      alert('Niste ulogovani.');
      return;
    }

    const parsed = JSON.parse(korisnikString);
    console.log(parsed);
    this.username = parsed.username;
    console.log(this.username);
    this.rezervacijaService.getMyRes(this.username).subscribe({
      next: (data) => {
        this.rezervacije = data;
        this.sveRezervacije = [...data];
        this.izracunajUkupnuCenu();
        console.log('Dohvaćene rezervacije:', data);
      },
      error: (error) => {
        console.error('Greška pri dohvatanju rezervacija:', error);
        alert('Došlo je do greške prilikom učitavanja rezervacija.');
      },
    });
  }

  promeniStatus(rez: Rezervacija, noviStatus: string): void {
    rez.status = noviStatus;
    this.rezervacijaService.updateStatus(rez, noviStatus).subscribe((data) => {
      this.izracunajUkupnuCenu();
      console.log(data.message);
    });
  }

  izracunajUkupnuCenu(): void {
    const rezervisane = this.rezervacije.filter(
      (r) => r.status === 'Rezervisano'
    );
    console.log('Broj rezervisanih:', rezervisane.length);
    this.ukupnaCena = rezervisane.reduce((suma, r) => suma + r.cenaKarte, 0);
  }

  obrisi(rez: any): void {
    console.log(rez);
    this.rezervacijaService.deleteRezervacija(rez._id).subscribe(() => {
      this.rezervacije = this.rezervacije.filter((r) => r !== rez);
      this.izracunajUkupnuCenu();
    });
  }

  oceni(rez: any): void {
  localStorage.setItem('rezData', JSON.stringify(rez));
  this.router.navigate(['/ocene']);
}
}

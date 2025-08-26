import { Component } from '@angular/core';
import { Korisnik } from '../korisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moj-profil',
  templateUrl: './moj-profil.component.html',
  styleUrls: ['./moj-profil.component.css'],
  standalone: false
})
export class MojProfilComponent {
  korisnik!: Korisnik;

  constructor(private router:Router){}

  ngOnInit(): void {
    const korisnikJson = localStorage.getItem('trenutniKorisnik');
    if (korisnikJson) {
      this.korisnik = JSON.parse(korisnikJson);
    } else {
      console.warn('Nema trenutno ulogovanog korisnika');
    }
  }

  logout(): void {
    localStorage.removeItem('trenutniKorisnik');
    this.router.navigate(['']);
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Korisnik } from '../korisnik';
import { Router } from '@angular/router';
import { MyService } from '../my.service';
import { Msg } from '../msg';

@Component({
  selector: 'app-izmeni-profil',
  templateUrl: './izmeni-profil.component.html',
  styleUrls: ['./izmeni-profil.component.css'],
  standalone: false
})
export class IzmeniProfilComponent {
  izmeniProfilForm!: FormGroup;
  sviZanrovi: string[] = ['Akcija',
    'Drama',
    'Komedija',
    'Triler',
    'Naučna fantastika',
    'Horor']
  omiljeniZanrovi: string[] = [];
  korisnik!: Korisnik;

  constructor(private fb: FormBuilder, private router: Router, private service: MyService) {}

  ngOnInit(): void {
    const korisnikJson = localStorage.getItem('trenutniKorisnik');
    if (korisnikJson) {
      this.korisnik = JSON.parse(korisnikJson);
      this.omiljeniZanrovi = [...this.korisnik.omiljeniZanrovi];

      this.izmeniProfilForm = this.fb.group({
        ime: [this.korisnik.ime, Validators.required],
        prezime: [this.korisnik.prezime, Validators.required],
        email: [this.korisnik.email, [Validators.required, Validators.email]],
        telefon: [this.korisnik.telefon],
        adresa: [this.korisnik.adresa]
      });
    } else {
      this.router.navigate(['/prijava']);
    }
  }

  onZanrChange(zanr: string, event: any): void {
    if (event.target.checked) {
      if (!this.omiljeniZanrovi.includes(zanr)) {
        this.omiljeniZanrovi.push(zanr);
      }
    } else {
      this.omiljeniZanrovi = this.omiljeniZanrovi.filter(z => z !== zanr);
    }
  }

onSubmit(): void {
  if (this.izmeniProfilForm.invalid) {
    this.izmeniProfilForm.markAllAsTouched();
    return;
  }

  const updatedKorisnik: Korisnik = {
    ...this.korisnik,
    ...this.izmeniProfilForm.value,
    omiljeniZanrovi: this.omiljeniZanrovi
  };

  this.service.updateKorisnik(updatedKorisnik).subscribe({
    next: (response: Msg) => {
      alert(response.message || 'Profil je uspešno ažuriran!');
      localStorage.setItem('trenutniKorisnik', JSON.stringify(updatedKorisnik));
      this.router.navigate(['/moj-profil']);
    },
    error: (err) => {
      console.error('Greška pri ažuriranju korisnika:', err);
      alert('Došlo je do greške prilikom ažuriranja profila.');
    }
  });
}

  otkazi(): void {
    this.router.navigate(['/moj-profil']);
  }



}

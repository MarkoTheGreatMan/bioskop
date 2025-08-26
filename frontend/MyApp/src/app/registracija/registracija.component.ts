import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MyService } from '../my.service';
import { Korisnik } from '../korisnik';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.css'],
  standalone: false,
})
export class RegistracijaComponent {
  registracijaForm: FormGroup;

  zanrovi: string[] = [
    'Akcija',
    'Drama',
    'Komedija',
    'Triler',
    'Naučna fantastika',
    'Horor',
  ];

  constructor(private router: Router, private fb: FormBuilder, private service: MyService) {
    this.registracijaForm = this.fb.group({
      ime: ['', Validators.required],
      prezime: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefon: [''],
      adresa: [''],
      omiljeniZanrovi: this.fb.array([]),
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onZanrChange(zanr: string, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const selectedGenres = this.registracijaForm.get(
      'omiljeniZanrovi'
    ) as FormArray;

    if (checkbox.checked) {
      selectedGenres.push(this.fb.control(zanr));
    } else {
      const index = selectedGenres.controls.findIndex((x) => x.value === zanr);
      if (index >= 0) {
        selectedGenres.removeAt(index);
      }
    }
  }

  onSubmit() {
  if (this.registracijaForm.invalid) {
    this.registracijaForm.markAllAsTouched(); // highlight invalid fields
    return;
  }

  const formValue = this.registracijaForm.value;

  const korisnik = new Korisnik(
    formValue.ime,
    formValue.prezime,
    formValue.email,
    formValue.telefon,
    formValue.adresa,
    formValue.omiljeniZanrovi,
    formValue.username,
    formValue.password
  );

  this.service.registrujSe(korisnik).subscribe({
    next: (res) => {
      console.log('Registracija uspešna:', res.message)
      localStorage.setItem('trenutniKorisnik', JSON.stringify(korisnik));
      this.router.navigate(['/moj-profil']);
    },
    error: (err) => console.error('Greška pri registraciji:', err),
  });
}
}

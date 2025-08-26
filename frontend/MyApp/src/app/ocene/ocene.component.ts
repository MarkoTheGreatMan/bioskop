import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyService } from '../my.service';
import { Komentar } from '../komentar';

@Component({
  selector: 'app-ocene',
  templateUrl: './ocene.component.html',
  styleUrls: ['./ocene.component.css']
})
export class OceneComponent implements OnInit{
  rez: any;
  ocena: number | null = null;
  komentar: string = '';

  constructor(private router: Router, private komentarService: MyService) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('rezData');
    if (stored) {
      this.rez = JSON.parse(stored);
      localStorage.removeItem('rezData'); // clear after loading
    }
  }

  submitKomentar() {
    if (this.ocena === null || this.ocena < 0 || this.ocena > 10 || !this.komentar.trim()) {
      return; // simple extra check
    }

    const noviKomentar: Komentar = {
      username: this.rez.ulogovaniKorisnik,
      film: this.rez.nazivFilma,
      ocena: this.ocena,
      komentar: this.komentar.trim()
    };

    this.komentarService.ostaviKomentar(noviKomentar).subscribe({
      next: (res) => {
        alert('Komentar uspešno poslat!');
        this.router.navigate(['/moj-profil']);
      },
      error: (err) => {
        console.error('Greška prilikom slanja komentara:', err);
        alert('Došlo je do greške, pokušajte ponovo.');
      }
    });
  }
}

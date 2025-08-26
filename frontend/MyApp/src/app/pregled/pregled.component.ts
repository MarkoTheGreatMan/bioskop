import { Component } from '@angular/core';
import { Komentar } from '../komentar';
import { MyService } from '../my.service';

@Component({
  selector: 'app-pregled',
  templateUrl: './pregled.component.html',
  styleUrls: ['./pregled.component.css']
})
export class PregledComponent {
  film: any = null;
  komentari: Komentar[] = [];
  komentariFiltrirani: Komentar[] = [];

  constructor(private komentarService: MyService) {}

  ngOnInit(): void {
    const storedFilm = localStorage.getItem('film');
    if (storedFilm) {
      this.film = JSON.parse(storedFilm);
    }

    this.komentarService.getAllKomentari().subscribe({
      next: (res) => {
        this.komentari = res;
        console.log(this.komentari)
        if (this.film?.naziv) {
          this.komentariFiltrirani = this.komentari.filter(
            k => k.film === this.film.naziv
          );
        }
      },
      error: (err) => {
        console.error('Greška prilikom dohvatanja komentara:', err);
      }
    });
  }

}

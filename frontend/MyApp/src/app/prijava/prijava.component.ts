import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyService } from '../my.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.css'],
  standalone: false,
})
export class PrijavaComponent {
  prijavaForm!: FormGroup;
  errorMessage: string = '';
  constructor(
    private fb: FormBuilder,
    private userService: MyService,
    private router: Router
  ) {
    this.prijavaForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  this.prijavaForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
}

  prijaviSe() {
    if (this.prijavaForm.invalid) {
      this.prijavaForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.prijavaForm.value;

    this.userService.login(username, password).subscribe({
      next: (user) => {
        console.log('Prijava uspešna', user);
        localStorage.setItem('trenutniKorisnik', JSON.stringify(user));
        this.router.navigate(['/moj-profil']);
      },
      error: (err) => {
        this.errorMessage = 'Pogrešno korisničko ime ili lozinka.';
      },
    });
  }
}

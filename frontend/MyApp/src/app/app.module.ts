import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { MojProfilComponent } from './moj-profil/moj-profil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProjekcijeComponent } from './projekcije/projekcije.component';
import { KorpaComponent } from './korpa/korpa.component';
import { OceneComponent } from './ocene/ocene.component';
import { IzmeniProfilComponent } from './izmeni-profil/izmeni-profil.component';
import { PregledComponent } from './pregled/pregled.component';

@NgModule({
  declarations: [
    AppComponent,
    PocetnaComponent,
    MojProfilComponent,
    PrijavaComponent,
    RegistracijaComponent,
    ProjekcijeComponent,
    KorpaComponent,
    OceneComponent,
    IzmeniProfilComponent,
    PregledComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

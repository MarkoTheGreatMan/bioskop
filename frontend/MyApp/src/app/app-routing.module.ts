import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PocetnaComponent } from './pocetna/pocetna.component';
import { MojProfilComponent } from './moj-profil/moj-profil.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { IzmeniProfilComponent } from './izmeni-profil/izmeni-profil.component';
import { ProjekcijeComponent } from './projekcije/projekcije.component';
import { KorpaComponent } from './korpa/korpa.component';
import { OceneComponent } from './ocene/ocene.component';
import { PregledComponent } from './pregled/pregled.component';

const routes: Routes = [
  { path: '', component: PocetnaComponent },
  { path: 'moj-profil', component: MojProfilComponent },
  { path: 'prijava', component: PrijavaComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'izmeni-profil', component: IzmeniProfilComponent },
  { path: 'projekcije', component: ProjekcijeComponent },
  { path: 'korpa', component: KorpaComponent },
  { path: 'ocene', component: OceneComponent },
  { path: 'pregled', component: PregledComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

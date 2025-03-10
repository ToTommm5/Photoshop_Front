import { Routes } from '@angular/router';
import { CommandesComponent } from './component/pages/commande/commande.component';
import { DetailsConcoursComponent } from './component/pages/details-concours/details-concours.component';
import { EpreuvePagesComponent } from './component/pages/epreuve-pages/epreuve-pages.component';
import { HomeComponent } from './component/pages/home/home.component';
import { PanierComponent } from './component/pages/panier/panier.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'concours/:id', component: EpreuvePagesComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'commandes', component: CommandesComponent },
  {
    path: 'detailsconcours/:concoursId/:epreuveId',
    component: DetailsConcoursComponent,
  },
];

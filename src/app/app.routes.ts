import { Routes } from '@angular/router';
import { DetailsConcoursComponent } from './component/pages/details-concours/details-concours.component';
import { HomeComponent } from './component/pages/home/home.component';
import { PanierComponent } from './component/pages/panier/panier.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'concours/:id', component: DetailsConcoursComponent },
  { path: 'panier', component: PanierComponent },
];

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from '../Models/commande.model'; // Importer ton modèle de commande

@Injectable({
  providedIn: 'root',
})
export class CommandeService {
  private fichierCommandes = 'Data/commandes.json';
  constructor(private http: HttpClient) {}

  getCommandes(): Observable<Commande[]> {
    return this.http.get<Commande[]>(this.fichierCommandes);
  }
}

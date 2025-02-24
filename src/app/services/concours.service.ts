import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '../Models/data.model'; // Import de l'interface

@Injectable({
  providedIn: 'root',
})
export class ConcoursService {
  constructor(private http: HttpClient) {}

  // Récupérer l'ensemble des données depuis un fichier JSON
  getData(): Observable<Data> {
    return this.http.get<Data>('Data/data.json'); // Utilisation du type Data
  }
}

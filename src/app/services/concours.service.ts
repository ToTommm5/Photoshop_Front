import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConcoursService {
  private apiUrl = 'http://localhost:5273/api/concours'; // URL de ton API ASP.NET

  constructor(private http: HttpClient) {}

  // Récupérer les concours
  getConcours(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}

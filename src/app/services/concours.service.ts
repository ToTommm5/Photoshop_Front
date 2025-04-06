import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConcoursService {
  private apiUrl = `${environment.apiUrl}/api/concours`; // URL de ton API ASP.NET

  constructor(private http: HttpClient) {}

  // Récupérer les concours
  getConcours(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}

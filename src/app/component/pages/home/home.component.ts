import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ConcoursService } from '../../../services/concours.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'], // Remarque : tu avais un petit souci avec styleUrl, il faut utiliser styleUrls
})
export class HomeComponent implements OnInit {
  concours: any[] = [];

  constructor(
    private http: HttpClient,
    private concoursService: ConcoursService
  ) {}

  ngOnInit(): void {
    this.concoursService.getConcours().subscribe(
      (data) => {
        // Suppose que data.concours est un tableau d'objets concours
        this.concours = data.concours.map((concours: any) => ({
          ...concours,
          img_url: concours.img_url.startsWith('http')
            ? concours.img_url
            : `${environment.apiUrl}${concours.img_url}`, // Compléter l'URL si nécessaire
        }));
      },
      (error) => {
        console.error('Erreur lors de la récupération des concours :', error);
      }
    );
  }
}

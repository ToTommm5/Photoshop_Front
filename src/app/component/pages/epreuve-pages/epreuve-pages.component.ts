import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-epreuve-pages',
  imports: [CommonModule, RouterModule],
  templateUrl: './epreuve-pages.component.html',
  styleUrl: './epreuve-pages.component.css',
})
export class EpreuvePagesComponent implements OnInit {
  concoursId!: string;
  concoursName!: string;
  concoursImageUrl!: string;
  epreuves: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.concoursId = params.get('id') || '';

      // Charger le fichier JSON
      this.http.get<any>(`${environment.apiUrl}/api/concours`).subscribe(
        (data) => {
          const concours = data.concours.find(
            (c: any) => c.id === this.concoursId
          );
          if (concours) {
            this.concoursName = concours.name;
            this.epreuves = concours.epreuves;
            this.concoursImageUrl = concours.img_url;

            this.concoursImageUrl = concours.img_url.startsWith('http')
              ? concours.img_url
              : `${environment.apiUrl}${concours.img_url}`;
          }
        },
        (error) => console.error('Erreur de chargement des épreuves :', error)
      );
    });
  }
  goBack(): void {
    window.history.back();
  }
}

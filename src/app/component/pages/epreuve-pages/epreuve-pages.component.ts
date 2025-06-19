import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-epreuve-pages',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './epreuve-pages.component.html',
  styleUrls: ['./epreuve-pages.component.css'],
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

      // Charger le fichier JSON local depuis /public/Data/
      this.http.get<any>('/Data/data.json').subscribe(
        (data) => {
          const concours = data.concours.find(
            (c: any) => c.id === this.concoursId
          );
          if (concours) {
            this.concoursName = concours.name;
            this.epreuves = concours.epreuves;
            this.concoursImageUrl = concours.img_url; // ex: "/Img/photo.jpg"
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

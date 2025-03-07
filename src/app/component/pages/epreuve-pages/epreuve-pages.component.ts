import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-epreuve-pages',
  imports: [CommonModule, RouterModule],
  templateUrl: './epreuve-pages.component.html',
  styleUrl: './epreuve-pages.component.css',
})
export class EpreuvePagesComponent implements OnInit {
  concoursId!: string;
  concoursName!: string;
  epreuves: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.concoursId = params.get('id') || '';

      // Charger le fichier JSON
      this.http.get<any>('Data/data.json').subscribe(
        (data) => {
          const concours = data.concours.find(
            (c: any) => c.id === this.concoursId
          );
          if (concours) {
            this.concoursName = concours.name;
            this.epreuves = concours.epreuves;
          }
        },
        (error) => console.error('Erreur de chargement des épreuves :', error)
      );
    });
  }
}

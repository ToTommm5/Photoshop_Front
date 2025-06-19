import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Concours, Epreuve } from '../../../Models/data.model';
import { ConcoursService } from '../../../services/concours.service';
import { PanierService } from '../../../services/panier.service';

@Component({
  selector: 'app-details-concours',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './details-concours.component.html',
  styleUrls: ['./details-concours.component.css'],
})
export class DetailsConcoursComponent implements OnInit {
  concoursId: string = '';
  epreuveId: string = '';
  concoursDetails: any;
  epreuveDetails: any;
  photos: any[] = [];
  concours: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private concoursService: ConcoursService,
    private panierService: PanierService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.concoursId = this.route.snapshot.paramMap.get('concoursId')!;
    this.epreuveId = this.route.snapshot.paramMap.get('epreuveId')!;

    this.concoursService.getConcours().subscribe(
      (data: any) => {
        this.concours = data.concours;

        this.concoursDetails = this.concours.find(
          (c: Concours) => c.id === this.concoursId
        );

        if (this.concoursDetails) {
          // Pas besoin d'ajouter un préfixe à img_url si c’est un chemin relatif vers /Img/
          this.epreuveDetails = this.concoursDetails.epreuves.find(
            (e: Epreuve) => e.id === this.epreuveId
          );

          if (this.epreuveDetails) {
            this.photos = this.epreuveDetails.photos;
          }
        }
      },
      (error) => {
        console.error(
          'Erreur lors du chargement des concours depuis le fichier local :',
          error
        );
      }
    );
  }

  // Gestion de la lightbox
  lightboxOpen: boolean = false;
  currentPhotoIndex: number = 0;
  showToast: boolean = false;

  openLightbox(index: number) {
    this.currentPhotoIndex = index;
    this.lightboxOpen = true;
  }

  closeLightbox() {
    this.lightboxOpen = false;
  }

  prevPhoto() {
    this.currentPhotoIndex =
      this.currentPhotoIndex > 0
        ? this.currentPhotoIndex - 1
        : this.photos.length - 1;
  }

  nextPhoto() {
    this.currentPhotoIndex =
      this.currentPhotoIndex < this.photos.length - 1
        ? this.currentPhotoIndex + 1
        : 0;
  }

  addToCart(photo: any) {
    if (!this.epreuveDetails || !this.concoursDetails) {
      console.error('❌ Données manquantes pour l’épreuve ou le concours', {
        epreuveDetails: this.epreuveDetails,
        concoursDetails: this.concoursDetails,
      });
      alert(
        'Erreur : impossible d’ajouter la photo au panier (données manquantes).'
      );
      return;
    }

    const photoCopie = {
      ...photo,
      epreuveId: this.epreuveDetails.id,
      epreuveNom: this.epreuveDetails.nom,
      concoursId: this.concoursDetails.id,
      concoursNom: this.concoursDetails.nom,
    };

    this.panierService.addToCart({
      ...photoCopie, // tout est mis au niveau racine
      quantity: 1,
      size: '10x15',
      price: 5,
    });
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  goBack(): void {
    window.history.back();
  }
}

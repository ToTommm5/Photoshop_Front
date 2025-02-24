import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Data } from '../../../Models/data.model'; // Importer le modèle Data
import { ConcoursService } from '../../../services/concours.service'; // Importer le service
import { PanierService } from '../../../services/panier.service';

@Component({
  selector: 'app-details-concours',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './details-concours.component.html',
  styleUrls: ['./details-concours.component.css'],
})
export class DetailsConcoursComponent implements OnInit {
  concoursId: string = ''; // Pour stocker l'ID du concours sélectionné
  concoursDetails: any; // Détails du concours
  photos: any[] = []; // Liste des photos filtrées
  concours: any[] = []; // Liste de tous les concours

  constructor(
    private route: ActivatedRoute,
    private concoursService: ConcoursService, // Injection du service,
    private panierService: PanierService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Charger les données depuis le service
    this.concoursService.getData().subscribe((data: Data) => {
      this.concours = data.concours; // Stocker les concours
      this.photos = data.photos; // Stocker les photos

      // Récupérer l'ID du concours depuis l'URL
      this.concoursId = this.route.snapshot.paramMap.get('id')!;
      this.concoursDetails = this.concours.find(
        (concours) => concours.id === this.concoursId
      );
      this.photos = this.photos.filter(
        (photo) => photo.concoursId === this.concoursId
      );
    });
  }
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
    if (this.currentPhotoIndex > 0) {
      this.currentPhotoIndex--;
    } else {
      this.currentPhotoIndex = this.photos.length - 1; // Retour au dernier
    }
  }

  nextPhoto() {
    if (this.currentPhotoIndex < this.photos.length - 1) {
      this.currentPhotoIndex++;
    } else {
      this.currentPhotoIndex = 0; // Retour au début
    }
  }

  addToCart(photo: any) {
    this.panierService.addToCart(photo);
    this.showToast = true; // Afficher le toast
    // Masquer le toast après 3 secondes
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}

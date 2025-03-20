import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Concours, Epreuve, Photo } from '../../../Models/data.model';
import { ConcoursService } from '../../../services/concours.service';
import { PanierService } from '../../../services/panier.service';
@Component({
  selector: 'app-details-concours',
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
          this.concoursDetails.img_url =
            this.concoursDetails.img_url.startsWith('http')
              ? this.concoursDetails.img_url
              : `http://localhost:5273${this.concoursDetails.img_url}`;

          this.epreuveDetails = this.concoursDetails.epreuves.find(
            (e: Epreuve) => e.id === this.epreuveId
          );

          if (this.epreuveDetails) {
            // ⚠️ Vérifier que les images ont bien un chemin complet
            this.photos = this.epreuveDetails.photos.map((photo: Photo) => ({
              id: photo.id,
              img_url: photo.img_url.startsWith('http')
                ? photo.img_url
                : `http://localhost:5273${photo.img_url}`,
            }));
          }
        }
      },
      (error) => {
        console.error(
          'Erreur lors du chargement des concours depuis l’API :',
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
    if (this.currentPhotoIndex > 0) {
      this.currentPhotoIndex--;
    } else {
      this.currentPhotoIndex = this.photos.length - 1;
    }
  }

  nextPhoto() {
    if (this.currentPhotoIndex < this.photos.length - 1) {
      this.currentPhotoIndex++;
    } else {
      this.currentPhotoIndex = 0;
    }
  }

  addToCart(photo: any) {
    this.panierService.addToCart(photo);
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  goBack(): void {
    window.history.back();
  }
}

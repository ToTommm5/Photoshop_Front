import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Data } from '../../../Models/data.model';
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
    this.concoursService.getData().subscribe((data: Data) => {
      this.concours = data.concours;

      // Récupérer les IDs depuis l'URL
      this.concoursId = this.route.snapshot.paramMap.get('concoursId')!;
      this.epreuveId = this.route.snapshot.paramMap.get('epreuveId')!;

      // Récupérer les détails du concours
      this.concoursDetails = this.concours.find(
        (c) => c.id === this.concoursId
      );

      // Récupérer les détails de l’épreuve
      if (this.concoursDetails) {
        this.epreuveDetails = this.concoursDetails.epreuves.find(
          (e: { id: string }) => e.id === this.epreuveId
        );
        if (this.epreuveDetails) {
          this.photos = this.epreuveDetails.photos;
        }
      }
    });
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
}

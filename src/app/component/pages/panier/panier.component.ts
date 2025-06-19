import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PanierService } from '../../../services/panier.service';

@Component({
  selector: 'app-panier',
  imports: [FormsModule, CommonModule],
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css'],
})
export class PanierComponent implements OnInit {
  cartItems: any[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;
  showToast: boolean = false;
  afficherFormulaire: boolean = false;
  commande = {
    prenom: '',
    nom: '',
    email: '',
  };

  constructor(private panierService: PanierService, private http: HttpClient) {}

  ngOnInit(): void {
    // Abonnement pour récupérer les éléments du panier
    this.panierService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.updateTotal();
    });
  }

  // Met à jour le prix de l'item selon la taille choisie
  updateItemPrice(item: any) {
    item.price = item.size === '10x15' ? 5 : 8;
    this.updateTotal();
  }

  // Met à jour le total à chaque changement (taille ou quantité)
  updateTotal() {
    this.totalQuantity = this.cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    this.totalPrice = this.cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
  }

  commander() {
    this.afficherFormulaire = true;
  }

  validerCommande() {
    const payload = {
      nom: this.commande.nom,
      prenom: this.commande.prenom,
      email: this.commande.email,
      cartItems: this.cartItems.map((item) => ({
        original_name: item.photo.original_name,
        quantity: item.quantity,
        size: item.size,
        price: item.price,
      })),
    };

    this.http
      .post('http://localhost:3000/api/envoyer-commande', payload)
      .subscribe({
        next: () => {
          alert('✅ Commande envoyée par email !');
          this.panierService.clearCart(); // <-- AJOUT ICI 🔥
          this.cartItems = []; // Optionnel, car le BehaviorSubject se mettra à jour
          this.afficherFormulaire = false;
        },
        error: (error) => {
          console.error("Erreur lors de l'envoi :", error);
          alert("❌ Une erreur est survenue lors de l'envoi de la commande.");
        },
      });
  }
  // Fonction pour supprimer un élément du panier
  supprimer(item: any) {
    this.panierService.removeFromCart(item.photo); // ✅ On passe uniquement la photo
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}

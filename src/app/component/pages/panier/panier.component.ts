import { CommonModule } from '@angular/common';
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

  constructor(private panierService: PanierService) {}

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
    alert(
      `Commande validée ! Vous avez commandé ${this.totalQuantity} photos pour un total de ${this.totalPrice}€`
    );
    this.panierService.clearCart();
    this.cartItems = [];
    this.totalQuantity = 0;
    this.totalPrice = 0;
  }

  // Fonction pour supprimer un élément du panier
  supprimer(idPhoto: string) {
    this.panierService.removeFromCart(idPhoto);
    this.showToast = true; // Afficher le toast
    // Masquer le toast après 3 secondes
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}

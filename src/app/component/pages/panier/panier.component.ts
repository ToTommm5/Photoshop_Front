import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PanierService } from '../../../services/panier.service';

@Component({
  selector: 'app-panier',
  imports: [CommonModule, FormsModule],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css',
})
export class PanierComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private panierService: PanierService) {}
  ngOnInit(): void {
    this.cartItems = this.panierService.getCartItems().map((item) => ({
      ...item,
      size: '10x15', // Taille par défaut
      quantity: item.quantity | 1, // Quantité par défaut
      price: 5, // Prix par défaut pour 10x15
    }));

    this.updateTotal();
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

  // Variables pour afficher le total
  totalQuantity: number = 0;
  totalPrice: number = 0;

  commander() {
    alert(
      `Commande validée ! Vous avez commandé ${this.totalQuantity} photos pour un total de ${this.totalPrice}€`
    );
    this.panierService.clearCart();
    this.cartItems = [];
    this.totalQuantity = 0;
    this.totalPrice = 0;
  }
}

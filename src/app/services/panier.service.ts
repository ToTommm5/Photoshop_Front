import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PanierItem } from '../Models/panier-item.model';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private panierItem: PanierItem[] = [];
  private cartItemsSubject = new BehaviorSubject<PanierItem[]>([]); // Utilisation de BehaviorSubject pour les items
  cartItems$ = this.cartItemsSubject.asObservable(); // Observable des éléments du panier

  private cartCount = new BehaviorSubject<number>(0); // Gestion du nombre total d'articles
  cartCount$ = this.cartCount.asObservable(); // Observable pour le nombre d'articles

  constructor() {}

  addToCart(photo: any) {
    if (!photo || !photo.id) {
      console.error('Photo invalide ajoutée au panier', photo);
      return;
    }

    const existItem = this.panierItem.find(
      (item) => item.photo.id === photo.id
    );

    if (existItem) {
      existItem.quantity++;
    } else {
      this.panierItem.push({ photo, quantity: 1, price: 5, size: '10x15' }); // Ajout d'un prix par défaut
    }

    this.updateCartItems(); // Mise à jour des éléments du panier
    this.updateCartCount(); // Mise à jour du nombre total d'articles
  }

  removeFromCart(photoId: string) {
    this.panierItem = this.panierItem.filter(
      (item) => item.photo.id !== photoId
    );
    this.updateCartItems(); // Mise à jour des éléments du panier après suppression
    this.updateCartCount(); // Mise à jour du nombre total d'articles
  }

  clearCart() {
    this.panierItem = [];
    this.updateCartItems(); // Mise à jour du panier après nettoyage
    this.updateCartCount(); // Mise à jour du nombre total d'articles
  }

  getCartItems() {
    return this.panierItem;
  }

  private updateCartItems() {
    this.cartItemsSubject.next([...this.panierItem]); // Mise à jour du BehaviorSubject avec le panier actuel
  }

  private updateCartCount() {
    const totalQuantity = this.panierItem.reduce(
      (acc, item) => acc + item.quantity,
      0
    ); // Total des articles
    this.cartCount.next(totalQuantity); // Mise à jour du nombre d'articles avec le BehaviorSubject
  }
}

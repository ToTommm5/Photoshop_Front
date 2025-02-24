import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PanierItem } from '../Models/panier-item.model';

@Injectable({
  providedIn: 'root',
})
export class PanierService {
  private panierItem: PanierItem[] = [];
  private cartCount = new BehaviorSubject<number>(0); // Création du BehaviorSubject

  cartCount$ = this.cartCount.asObservable(); // Observable à utiliser dans le header

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
      this.panierItem.push({ photo, quantity: 1 });
    }

    this.updateCartCount();
  }

  updateQuantity(photoId: string, change: number) {
    const item = this.panierItem.find((item) => item.photo.id === photoId);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeFromCart(photoId);
      }
    }
    this.updateCartCount();
  }

  removeFromCart(photoId: string) {
    this.panierItem = this.panierItem.filter(
      (item) => item.photo.id !== photoId
    );
    this.updateCartCount();
  }

  getCartItems() {
    return this.panierItem;
  }

  clearCart() {
    this.panierItem = [];
    this.updateCartCount();
  }

  private updateCartCount() {
    const totalQuantity = this.panierItem.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    this.cartCount.next(totalQuantity); // Mise à jour du BehaviorSubject
  }
}

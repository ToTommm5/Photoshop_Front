import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, RouterModule],
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;

  constructor(private panierService: PanierService) {}

  ngOnInit() {
    this.panierService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
  }
}

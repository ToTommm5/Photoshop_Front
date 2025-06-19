import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConcoursService } from '../../../services/concours.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  concours: any[] = [];

  constructor(private concoursService: ConcoursService) {}

  ngOnInit(): void {
    this.concoursService.getConcours().subscribe(
      (data) => {
        // Si data.concours existe dans ton JSON
        this.concours = data.concours;
      },
      (error) => {
        console.error('Erreur lors de la récupération des concours :', error);
      }
    );
  }
}

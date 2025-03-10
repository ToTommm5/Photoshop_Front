import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Commande } from '../../../Models/commande.model';
import { CommandeService } from '../../../services/commande.service';

@Component({
  selector: 'app-commande',
  imports: [CommonModule],
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.css'],
})
export class CommandesComponent implements OnInit {
  commandes: Commande[] = [];
  commandeSelectionnee: Commande | null = null;
  statuts: string[] = ['En préparation', 'Prête', 'Livrée'];

  constructor(private commandeService: CommandeService) {}

  ngOnInit(): void {
    this.commandeService.getCommandes().subscribe((commandes) => {
      this.commandes = commandes;
    });
  }

  modifierCommande(commande: Commande): void {
    this.commandeSelectionnee = { ...commande }; // Copie de l'objet pour éviter les modifications directes
  }
  // Méthode pour récupérer les commandes selon leur statut
  getCommandesParStatut(statut: string): Commande[] {
    return this.commandes.filter((commande) => commande.statut === statut);
  }
}

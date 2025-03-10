import { PanierItem } from './panier-item.model';

export interface Commande {
  id: number;
  client: string;
  panier: PanierItem[];
  total: number;
  statut: string; // En cours, Terminé, Annulé
  date: string;
}

import { Photo } from './data.model';

export interface PanierItem {
  photo: Photo;
  quantity: number;
  price: number;
  size: string;
}

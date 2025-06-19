export interface Concours {
  id: string;
  name: string;
  img_url: string;
  epreuves: Epreuve[];
}
export interface Epreuve {
  id: string;
  name: string;
  photos: Photo[];
}

export interface Photo {
  id: string;
  nom: string;
  url: string;
  // Ajoute ces deux lignes :
  epreuveId?: string;
  concoursId?: string;
}

export interface Data {
  concours: Concours[];
  photos: Photo[];
}

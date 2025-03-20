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
  img_url: string;
}

export interface Data {
  concours: Concours[];
  photos: Photo[];
}

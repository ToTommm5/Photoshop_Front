export interface Concours {
  id: string;
  name: string;
  img_url: string;
}

export interface Photo {
  id: string;
  img_url: string;
  concoursId: string;
}

export interface Data {
  concours: Concours[];
  photos: Photo[];
}

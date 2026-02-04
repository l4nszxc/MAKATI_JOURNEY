export interface Album {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  coverPhotoUrl?: string;
}

export interface Photo {
  id: string;
  albumId: string;
  title: string;
  description: string;
  imageUrl: string;
  uploadedAt: Date;
  location?: string;
}

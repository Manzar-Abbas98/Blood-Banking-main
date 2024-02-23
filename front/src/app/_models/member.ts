import { Photo } from "./Photo";

export interface Member {
    id: number;
    email: string;
    userName: string;
    photoUrl: string;
    gender: string;
    bloodGroup: string;
    age: number;
    contact: string;
    created: Date;
    lastActive: Date;
    city: string;
    country: string;
    introduction: string;
    photos: Photo[];
  }
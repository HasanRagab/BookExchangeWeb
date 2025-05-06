export interface Book {
  id: number;
  title: string;
  isbn: string;
  genre: string;
  language: string;
  publicationDate: string;
  availableFrom: string;
  availableTo: string;
  borrowPrice: number;
  isAvailable: boolean;
  isApprovedByAdmin: boolean;
  coverImage: string;
  bookOwnerId: string;
  bookOwnerName: string;
}

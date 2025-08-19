export interface Todos {
  id: number;
  title: string;
  description: string;
  status: string;
  userId: number;
  imageUrl?: string | null;
}
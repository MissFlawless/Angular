export interface Suggestion {
  id: number;
  title: string;
  description: string;
  category: string;
  date: Date;
  status: 'acceptee' | 'refusee' | 'en_attente';
  likes: number; // 🔹 nouveau champ pour le nombre de likes
}

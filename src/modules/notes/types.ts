export interface Note {
  id: string;
  name: string;
  text: string;
  topic: string | null;
  createdAt: number;
}

export interface Topic {
  id: string;
  name: string;
  color: string;
  createdAt: number;
}

export interface DisplayNote extends Omit<Note, 'topic'> {
  topic: Topic | null;
}

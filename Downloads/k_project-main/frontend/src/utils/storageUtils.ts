import { Note } from '../types/notes';

const STORAGE_KEY = 'user_notes';

export const loadNotes = (): Note[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveNotes = (notes: Note[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
};
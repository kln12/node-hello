import React from 'react';
import NoteItem from './NoteItem';
import { Note } from '../../types/notes';

interface NotesListProps {
  notes: Note[];
  onDelete: (id: string) => void;
}

const NotesList = ({ notes, onDelete }: NotesListProps) => {
  return (
    <div className="space-y-4">
      {notes.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No notes yet. Add your first note!</p>
      ) : (
        notes.map((note) => (
          <NoteItem
            key={note.id}
            id={note.id}
            note={note.content}
            date={note.date}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default NotesList;
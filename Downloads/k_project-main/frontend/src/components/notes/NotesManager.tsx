import React, { useState, useEffect } from 'react';
import { StickyNote } from 'lucide-react';
import NoteForm from './NoteForm';
import NotesList from './NotesList';
import { Note } from '../../types/notes';
import { loadNotes, saveNotes } from '../../utils/storageUtils';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const NotesManager = () => {
  const [notes, setNotes] = useState<Note[]>(loadNotes());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = (content: string, date: string) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      content,
      date,
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setSelectedDate(new Date());
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <StickyNote className="h-6 w-6 text-indigo-500" />
        <h2 className="text-2xl font-bold text-gray-800">Notes</h2>
      </div>
      <div className="space-y-6">
        <div className="mb-6">
          <button
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md"
          >
            {isCalendarOpen ? 'Hide Calendar' : 'Show Calendar'}
          </button>
          {isCalendarOpen && (
            <Calendar
              value={selectedDate}
              onChange={(date) => setSelectedDate(date as Date)}
              className="react-calendar"
            />
          )}
        </div>
        <NoteForm onSubmit={addNote} />
        <NotesList notes={notes} onDelete={deleteNote} />
      </div>
    </div>
  );
};

export default NotesManager;

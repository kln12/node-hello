import React from 'react';
import { Trash2 } from 'lucide-react';
import { formatDate } from '../../utils/dateUtils';

interface NoteItemProps {
  id: string;
  note: string;
  date: string;
  onDelete: (id: string) => void;
}

const NoteItem = ({ id, note, date, onDelete }: NoteItemProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm font-medium text-indigo-600">{formatDate(date)}</p>
          <p className="mt-1 text-gray-900">{note}</p>
        </div>
        <button
          onClick={() => onDelete(id)}
          className="ml-4 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Delete note"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default NoteItem;
import { useEffect, useState } from "react";
import * as storage from "@/lib/storage";
import { Note } from "@/types";
import { StickyNote, Trash2 } from "lucide-react";

export default function NotesGrid({ filterTag, sortBy = "updatedAt" }: {
  filterTag?: string;
  sortBy?: "createdAt" | "updatedAt" | "title";
}) {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    loadNotes();
    const handler = () => loadNotes();
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [filterTag, sortBy]);

  const loadNotes = () => {
    let filtered = storage.getNotes();
    if (filterTag) filtered = filtered.filter(n => n.tags?.includes(filterTag));
    filtered.sort((a, b) => new Date(b[sortBy]).getTime() - new Date(a[sortBy]).getTime());
    setNotes(filtered);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this note?")) {
      storage.deleteNote(id);
      loadNotes();
    }
  };

  const colors = {
    white: "bg-white",
    yellow: "bg-yellow-100",
    blue: "bg-blue-100",
    green: "bg-green-100",
    pink: "bg-pink-100",
    purple: "bg-purple-100",
  };

  if (notes.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <StickyNote className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <p className="text-gray-600">No notes yet</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Notes ({notes.length})</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`${colors[note.color || "white"]} rounded-lg shadow-md p-4 group relative`}
          >
            <button
              onClick={() => handleDelete(note.id)}
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 hover:bg-red-100 rounded text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <h4 className="font-semibold text-gray-800 mb-2">{note.title}</h4>
            <p className="text-sm text-gray-700 line-clamp-4">{note.content}</p>
            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-3">
                {note.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 bg-gray-700 text-white text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
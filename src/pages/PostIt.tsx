import React, { useState } from "react";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { PlusCircle } from "lucide-react";

interface PostItNote {
  id: string;
  text: string;
  position: { x: number; y: number };
  color: string;
}

const PostIt: React.FC = () => {
  const [notes, setNotes] = useState<PostItNote[]>([]);
  const [draggedNote, setDraggedNote] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const colors = [
    "bg-zinc-100",
    "bg-zinc-200",
    "bg-zinc-300",
    "bg-neutral-200",
  ];

  const addNewNote = () => {
    const newNote: PostItNote = {
      id: Date.now().toString(),
      text: "",
      position: {
        x: Math.random() * (window.innerWidth - 200) + 100,
        y: Math.random() * (window.innerHeight - 200) + 100,
      },
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setNotes([...notes, newNote]);
  };

  const handleMouseDown = (e: React.MouseEvent, noteId: string) => {
    const note = notes.find((n) => n.id === noteId);
    if (!note) return;

    setDraggedNote(noteId);
    setOffset({
      x: e.clientX - note.position.x,
      y: e.clientY - note.position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedNote) return;

    setNotes(
      notes.map((note) =>
        note.id === draggedNote
          ? {
              ...note,
              position: {
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
              },
            }
          : note
      )
    );
  };

  const handleMouseUp = () => {
    setDraggedNote(null);
  };

  const updateNoteText = (id: string, text: string) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, text } : note)));
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div
      className="relative min-h-screen p-4"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={addNewNote}
          className="rounded-full h-12 w-12 bg-zinc-900 hover:bg-zinc-800 text-white shadow-lg flex items-center justify-center"
        >
          <PlusCircle className="h-6 w-6" />
        </Button>
      </div>

      {notes.map((note) => (
        <div
          key={note.id}
          className={`absolute w-64 ${note.color} rounded-lg shadow-lg transform rotate-[-1deg] transition-shadow hover:shadow-xl`}
          style={{
            left: `${note.position.x}px`,
            top: `${note.position.y}px`,
            cursor: draggedNote === note.id ? "grabbing" : "grab",
          }}
        >
          <div
            className="h-6 bg-zinc-800/5 rounded-t-lg cursor-move flex justify-between items-center px-2"
            onMouseDown={(e) => handleMouseDown(e, note.id)}
          >
            <span className="text-xs text-zinc-500">
              {new Date().toLocaleDateString()}
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-zinc-800/10"
              onClick={() => deleteNote(note.id)}
            >
              ×
            </Button>
          </div>
          <Textarea
            value={note.text}
            onChange={(e) => updateNoteText(note.id, e.target.value)}
            placeholder="메모를 입력하세요..."
            className="w-full bg-transparent border-none focus:ring-0 resize-none h-32 p-3 text-zinc-800"
          />
        </div>
      ))}
    </div>
  );
};

export default PostIt;

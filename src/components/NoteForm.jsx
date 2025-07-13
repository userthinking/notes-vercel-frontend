import React, { useState, useMemo } from "react";
import { useNotesContext } from "../context/NotesContext";
import { createNote } from "../api/notes";
import { toast } from "react-toastify";

const NoteForm = () => {
  const { setNotes, setShowForm } = useNotesContext();
  const [form, setForm] = useState({ title: "", body: "" });

  const colors = useMemo(() => [
    "#FEC971", "#FE9B72", "#B693FD", "#B693FF", "#E3EF90",
    "#FFD3B4", "#FFABAB", "#FFC3A0", "#FFDAC1", "#E2F0CB",
    "#B5EAD7", "#C7CEEA", "#F1F0FF", "#FFF5BA", "#C9F9FF",
    "#D5AAFF", "#FFD6E8", "#FAF4B7", "#E5E1EE", "#D8F3DC",
    "#F0EFEB", "#CCE2CB", "#FFEBE0", "#FBE4D8", "#FFEE93",
    "#FCD5D5",
  ], []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async () => {
    if (!form.title.trim() || !form.body.trim()) return;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const newNote = await createNote({ ...form, bgColor: color });
    setNotes((prev) => [newNote, ...prev]);
    toast.success("Note added");
    setForm({ title: "", body: "" });
    setShowForm(false);
  };

  const handleCancel = () => {
    setForm({ title: "", body: "" });
    setShowForm(false);
  };

  return (
    <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full h-48 sm:h-56 lg:h-64 shadow-lg relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 hover:border-blue-300 transition-all duration-200">
      <div className="h-full flex flex-col">
        {/* Title Input */}
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Note title..."
          className="text-black text-base sm:text-lg font-semibold bg-transparent border-none outline-none placeholder-gray-500 mb-2 sm:mb-3 w-full"
          autoFocus
        />
        
        {/* Body Input */}
        <textarea
          name="body"
          value={form.body}
          onChange={handleChange}
          placeholder="Write your note here..."
          className="text-gray-700 font-medium text-xs sm:text-sm leading-relaxed bg-transparent border-none outline-none placeholder-gray-400 resize-none flex-1 w-full"
        ></textarea>
        
        {/* Action Buttons */}
        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex gap-1 sm:gap-2">
          <button
            onClick={handleCancel}
            className="bg-gray-500 text-white p-1.5 sm:p-2 rounded-full hover:bg-gray-600 transition-colors duration-200 text-xs sm:text-sm"
            title="Cancel"
          >
            ✕
          </button>
          <button
            onClick={handleAdd}
            disabled={!form.title.trim() || !form.body.trim()}
            className="bg-green-500 text-white p-1.5 sm:p-2 rounded-full hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 text-xs sm:text-sm"
            title="Add Note"
          >
            ✓
          </button>
        </div>
        
        {/* Character Count */}
        <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-6">
          <p className="text-xs text-gray-500">
            {form.body.length}/500
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;

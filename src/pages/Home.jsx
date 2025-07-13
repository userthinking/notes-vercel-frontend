import React from "react";
import Navbar from "../components/Navbar";
import { useNotesContext } from "../context/NotesContext";
import Note from "../components/Note";
import NoteForm from "../components/NoteForm";

const Home = () => {
  const { notes, searchQuery, setSearchQuery, showForm } = useNotesContext();
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-[#E3E9F3] flex justify-center items-center p-2 sm:p-4 lg:p-6">
      <div className="min-h-[40rem] w-full max-w-[90rem] bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg flex flex-col lg:flex-row">
        <Navbar />
        <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8">
          {/* Header Section */}
          <div className="mb-6 sm:mb-8">
            
            {/* Search Bar */}
            <div className="max-w-md w-full">
              <div className="relative flex items-center bg-gray-50 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-200">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 sm:mr-3 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
                  />
                </svg>
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notes..."
                  className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent text-sm sm:text-base focus:outline-none"
                />
              </div>
            </div>
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 -mt-1 mb-4 sm:mb-6">Notes</h1>

          {/* Notes Grid Section */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 auto-rows-max">
              {/* Note Form - appears first when active */}
              {showForm && (
                <div className="animate-fadeIn">
                  <NoteForm />
                </div>
              )}
              
              {/* Notes */}
              {filteredNotes.map((note) => (
                <div key={note._id} className="animate-fadeIn">
                  <Note note={note} />
                </div>
              ))}
            </div>
            
            {/* Empty State */}
            {filteredNotes.length === 0 && !showForm && (
              <div className="text-center py-8 sm:py-12 lg:py-16">
                <div className="text-gray-400 text-4xl sm:text-5xl lg:text-6xl mb-3 sm:mb-4">
                  {searchQuery ? "🔍" : "📝"}
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-600 mb-2 sm:mb-3">
                  {searchQuery ? "No notes found" : "No notes yet"}
                </h3>
                <p className="text-sm sm:text-base text-gray-500 px-4 sm:px-8 lg:px-12">
                  {searchQuery 
                    ? `No notes match "${searchQuery}". Try a different search term.`
                    : "Create your first note to get started!"
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
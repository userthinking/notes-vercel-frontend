import React, { createContext, useContext, useEffect, useState } from "react";
import { getAllNotes } from "../api/notes";
import { toast } from "react-toastify";
import { useAuth } from "./AuthContext";

const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Only fetch notes if user is authenticated
    if (isAuthenticated) {
      getAllNotes()
        .then(setNotes)
        .catch(() => toast.error("Failed to fetch notes"));
    } else {
      // Clear notes when user is not authenticated
      setNotes([]);
    }
  }, [isAuthenticated]);

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        searchQuery,
        setSearchQuery,
        showForm,
        setShowForm,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotesContext = () => useContext(NotesContext);
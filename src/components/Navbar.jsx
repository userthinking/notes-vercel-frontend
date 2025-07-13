import React, { useState } from "react";
import ColorsDiv from "./ColorsDiv";
import { useNotesContext } from "../context/NotesContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { showForm, setShowForm } = useNotesContext();
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const clickHandler = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg flex items-center justify-center transition-all duration-200"
        >
          <span className={`text-xl transition-transform duration-200 ${isMobileMenuOpen ? 'fa-solid fa-times' : 'fa-solid fa-bars'}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-50 to-indigo-50 border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          {/* Logo/Brand */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 text-center">📝</h1>
            <h2 className="text-lg font-semibold text-gray-600 text-center mt-2">Notes</h2>
          </div>
          
          {/* User Info */}
          {user && (
            <div className="mb-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg font-semibold mb-3 mx-auto">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <p className="text-sm text-gray-600 font-medium">
                {user.username}
              </p>
            </div>
          )}
          
          {/* Add Note Button */}
          <button
            onClick={() => {
              clickHandler();
              setIsMobileMenuOpen(false);
            }}
            className={`w-full py-3 flex items-center justify-center rounded-xl shadow-lg transition-all duration-200 mb-4 ${
              showForm 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <span className={`text-xl mr-2 ${showForm ? 'fa-solid fa-times' : 'fa-solid fa-plus'}`}></span>
            <span className="font-semibold">{showForm ? "Cancel" : "Add Note"}</span>
          </button>
          
          {/* Status Indicator */}
          {showForm && (
            <div className="mb-4 text-sm text-gray-500 text-center">
              Creating note...
            </div>
          )}
          
          {/* Logout Button */}
          {user && (
            <button
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
              }}
              className="mt-auto w-full py-3 flex items-center justify-center rounded-xl shadow-lg bg-gray-500 hover:bg-gray-600 text-white transition-all duration-200"
            >
              <span className="text-xl mr-2">🚪</span>
              <span className="font-semibold">Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex min-h-full w-20 bg-gradient-to-b from-blue-50 to-indigo-50 border-r border-gray-200 p-6 flex-col items-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-800 text-center">📝</h1>
          <h2 className="text-sm font-semibold text-gray-600 text-center mt-1">Notes</h2>
        </div>
        
        {/* User Info */}
        {user && (
          <div className="mb-6 text-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold mb-2 mx-auto">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <p className="text-xs text-gray-600 truncate w-full">
              {user.username}
            </p>
          </div>
        )}
        
        {/* Add Note Button */}
        <button
          onClick={clickHandler}
          className={`w-12 h-12 flex items-center justify-center rounded-xl shadow-lg transition-all duration-200 ${
            showForm 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-110'
          }`}
          title={showForm ? "Cancel" : "Add Note"}
        >
          <span className={`text-2xl ${showForm ? 'fa-solid fa-times' : 'fa-solid fa-plus'}`}></span>
        </button>
        
        {/* Status Indicator */}
        {showForm && (
          <div className="mt-4 text-xs text-gray-500 text-center">
            Creating note...
          </div>
        )}
        
        {/* Logout Button */}
        {user && (
          <button
            onClick={logout}
            className="mt-auto w-12 h-12 flex items-center justify-center rounded-xl shadow-lg bg-gray-500 hover:bg-gray-600 text-white transition-all duration-200 hover:scale-110"
            title="Logout"
          >
            <span className="text-xl">🚪</span>
          </button>
        )}
        
        {/* Future: Color Palette */}
        {false && <ColorsDiv />}
      </div>
    </>
  );
};

export default Navbar;
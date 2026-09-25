// import React from "react";
import { FiSearch } from "react-icons/fi";

export const SearchBar = () => {
  return (
    <div className="flex items-center gap-3 rounded-sm border border-border bg-bg/60 px-4 py-3 text-text-muted transition-colors focus-within:border-primary">
      <FiSearch className="size-7 shrink-0" />
      <input
        type="text"
        placeholder="Buscar productos..."
        className="w-full border-0 bg-transparent text-sm text-text placeholder:text-text-muted/70 focus:outline-none"
      />
      <button className="shkrink-0 text-xs font-medium text-text-muted transition-colors hover:text-text">
        Limpiar
      </button>
    </div>
  );
};



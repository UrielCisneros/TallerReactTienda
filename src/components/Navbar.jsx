import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-border/80 bg-bg/70 backfrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-appitem-center justify-between px-4 sm:px-6">
        <NavLink>
          Sound
          <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">Gear</span>
        </NavLink>
      </div>
    </header>
  );
};

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border">
      <div className="mx-auto flex w-full max-w-app flex-col gap-1 px-4 py-8 text-sm text-text-muted sm:px-6">
        <p className="m-0 font-semibold text-text">
          Sound
          <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            Gear
          </span>
        </p>
        <p className="m-0">Proyecto de práctica para el taller de React + Vite</p>
        <p className="m-0">Hecho con React, Vite, Tailwind, GSAP y mucho café ☕</p>
      </div>
    </footer>
  );
}

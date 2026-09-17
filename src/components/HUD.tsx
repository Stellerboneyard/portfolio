export function HUD() {
  return (
    <div className="content-layer pointer-events-none fixed inset-x-0 top-0 flex items-center justify-between px-6 py-6 sm:px-10">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "linear-gradient(to bottom, rgba(5,5,6,0.65) 0%, rgba(5,5,6,0) 100%)" }}
      />
      <span className="font-mono text-xs tracking-[0.3em] text-mist-soft uppercase">Aryan Raj</span>
    </div>
  );
}

export function AnimatedGlowCard() {
  return (
    // The main container, dark and rounded
    <div className="relative w-full h-32 overflow-hidden blur-sm">
      <div className="glow-effect" />
      <div className="absolute inset-0" />
    </div>
  );
}

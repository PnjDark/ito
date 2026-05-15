export function Scanlines({ className = "" }: { className?: string }) {
  return <div className={`scanlines absolute inset-0 pointer-events-none ${className}`} />;
}

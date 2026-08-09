export default function Stamp({ children }: { children: string }) {
  return (
    <span className="inline-block -skew-x-[12deg] bg-brown-tint px-2 py-[3px] font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-brown">
      <span className="block skew-x-[12deg]">{children}</span>
    </span>
  );
}

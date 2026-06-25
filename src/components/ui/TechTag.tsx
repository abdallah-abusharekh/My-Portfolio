interface TechTagProps {
  label: string
}

export function TechTag({ label }: TechTagProps) {
  return (
    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-mono font-medium tracking-widest uppercase border border-[#2a2a2a] text-[#888] bg-[#111]">
      {label}
    </span>
  )
}

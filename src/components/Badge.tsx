type BadgeCategory = "neutral" | "success" | "warning"

interface BadgeProps {
  category: BadgeCategory
}

const categoryStyles: Record<BadgeCategory, string> = {
  "neutral": "bg-slate-700/80 text-slate-300 border-slate-600",
  "success": "bg-teal-900/60 text-teal-400 border-teal-700",
  "warning": "bg-amber-900/60 text-amber-400 border-amber-700",
}

export function Badge({ category }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-medium ${categoryStyles[category]}`}
    >
      {category}
    </span>
  )
}

export type { BadgeCategory }

export function getStatusTone(status: string): { badge: string } {
  const tones: Record<string, { badge: string }> = {
    active: {
      badge: 'border-emerald-400/30 bg-emerald-400/15 text-emerald-200 hover:bg-emerald-400/15',
    },
    proposed: {
      badge: 'border-sky-400/30 bg-sky-400/15 text-sky-200 hover:bg-sky-400/15',
    },
    archived: {
      badge: 'border-zinc-400/30 bg-zinc-400/15 text-zinc-300 hover:bg-zinc-400/15',
    },
    noise: {
      badge: 'border-amber-400/30 bg-amber-400/15 text-amber-200 hover:bg-amber-400/15',
    },
    deleted: {
      badge: 'border-rose-400/30 bg-rose-400/15 text-rose-200 hover:bg-rose-400/15',
    },
  }

  return (
    tones[status] ?? {
      badge: 'border-border bg-muted text-foreground hover:bg-muted',
    }
  )
}

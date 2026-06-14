import { Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function ConsoleHeader({ onCreateMemory }: { onCreateMemory: () => void }) {
  return (
    <header className="mb-4 flex items-start justify-between gap-4 max-md:grid">
      <div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">
          Portable AI Memory Hub (Console)
        </h1>
        <p className="mt-2 max-w-3xl text-base leading-6 text-muted-foreground">
          Current project store, filtered to the active memory signals a LLM would use.
        </p>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button className="max-md:w-full" onClick={onCreateMemory}>
            <Plus />
            New memory
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs text-left leading-5">
          Create a new durable project memory (.ai-memory). Use the Type field to pick decision /
          knowledge / rule / preference / etc.
        </TooltipContent>
      </Tooltip>
    </header>
  )
}

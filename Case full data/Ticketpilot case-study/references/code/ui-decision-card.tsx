import { useState } from "react";
import { ChevronDown, Sparkles, ThumbsDown } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { TEAMS, WT } from "@/lib/demo/data";
import type { Decision } from "@/lib/demo/logic";
import { MatchPill } from "./bits";

export function DecisionCard({ d, onAssign, readOnly, isMain }: { d: Decision; onAssign?: (team: string) => void; readOnly?: boolean; isMain?: boolean }) {
  const [why, setWhy] = useState(false);
  const showWhyNot = isMain && d.team === "Applications";
  return (
    <section data-tour="decision-card" className="overflow-hidden rounded-xl border border-ai bg-card">
      <header className="flex items-center justify-between bg-ai-bg px-4 py-2.5">
        <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-ai">
          <Sparkles className="size-3.5" /> TicketPilot suggestion{readOnly && " · as shown at the time"}
        </span>
        <MatchPill label={d.label} />
      </header>
      <div className="space-y-3 p-4">
        {d.team ? (
          <>
            <div className="font-display text-[18px]">
              Recommended team: <b className="font-semibold">{d.team}</b>
            </div>
            <p className="text-[13.5px] text-muted-foreground">{d.reason}</p>
          </>
        ) : (
          <>
            <div className="font-display text-[18px] font-semibold">Needs human review</div>
            <p className="text-[13.5px] text-muted-foreground">No strong match in past cases. Please triage. The platform will not guess.</p>
          </>
        )}
        {showWhyNot && (
          <div className="rounded-lg border bg-background">
            <button onClick={() => setWhy((w) => !w)} className="flex w-full items-center justify-between px-3 py-2 text-[13px] font-medium">
              Why not Security?
              <ChevronDown className={cn("size-4 transition-transform", why && "rotate-180")} />
            </button>
            {why && <p className="px-3 pb-3 text-[13px] leading-relaxed text-muted-foreground">{WT.decision.whyNotSecurity}</p>}
          </div>
        )}
        {!readOnly && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {d.team && (
              <Button data-tour="assign" onClick={() => onAssign?.(d.team!)}>
                Assign to {d.team}
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{d.team ? "Choose another team" : "Choose a team"} <ChevronDown className="size-4" /></Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {TEAMS.map((t) => (
                  <DropdownMenuItem key={t} onSelect={() => onAssign?.(t)}>{t}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="sm" className="ml-auto text-muted-foreground" onClick={() => toast("Thanks. Your feedback helps tune suggestions.")}>
              <ThumbsDown className="size-3.5" /> Not helpful
            </Button>
          </div>
        )}
        <p className="border-t pt-3 text-[12px] text-muted-foreground">TicketPilot recommends. A person decides. Nothing changes until you assign.</p>
      </div>
    </section>
  );
}

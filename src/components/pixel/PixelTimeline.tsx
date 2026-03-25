import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { TimelineGroup } from '../../data/site';
import { PixelBadge } from './PixelBadge';
import { PixelPanel } from './PixelPanel';

type PixelTimelineProps = {
  groups: TimelineGroup[];
};

export function PixelTimeline({ groups }: PixelTimelineProps) {
  const [openMap, setOpenMap] = useState<Record<string, string | null>>(() =>
    Object.fromEntries(
      groups.map((group) => [group.year, group.items.find((item) => item.current)?.id ?? group.items[0]?.id ?? null])
    )
  );

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      {groups.map((group, groupIndex) => (
        <motion.div
          key={group.year}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, delay: groupIndex * 0.08 }}
        >
          <PixelPanel className="h-full p-6 sm:p-7">
            <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-5">
              <div>
                <p className="font-pixel text-[0.58rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Timeline
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-[var(--text-primary)]">
                  {group.year}
                </h3>
              </div>
              <PixelBadge tone="pink">{group.items.length} Milestones</PixelBadge>
            </div>

            <div className="relative mt-6 space-y-4">
              <div className="absolute bottom-2 left-[1.05rem] top-2 w-px bg-[linear-gradient(180deg,rgba(255,92,214,0.44),rgba(138,92,255,0.2),transparent)]" />

              {group.items.map((item) => {
                const isOpen = openMap[group.year] === item.id;

                return (
                  <div
                    key={item.id}
                    className="relative pl-10"
                  >
                    <span
                      className={`absolute left-[0.7rem] top-5 h-3.5 w-3.5 -translate-x-1/2 rotate-45 border ${
                        item.current
                          ? 'border-[var(--accent-primary)] bg-[rgba(255,92,214,0.28)] shadow-[0_0_18px_rgba(255,92,214,0.28)]'
                          : 'border-white/15 bg-[rgba(255,255,255,0.05)]'
                      }`}
                    />

                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenMap((current) => ({
                          ...current,
                          [group.year]: current[group.year] === item.id ? null : item.id
                        }))
                      }
                      className={`w-full rounded-md border border-white/6 bg-white/[0.03] px-4 py-4 text-left transition-all duration-200 hover:border-white/12 hover:bg-white/[0.05] ${
                        isOpen ? 'border-[var(--accent-border)] bg-[rgba(255,92,214,0.05)]' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <PixelBadge tone={item.current ? 'pink' : 'muted'}>{item.period}</PixelBadge>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="font-display text-base font-semibold leading-6 text-[var(--text-primary)] sm:text-lg">
                              {item.title}
                            </h4>
                            <ChevronDown
                              size={18}
                              className={`mt-1 shrink-0 text-[var(--text-muted)] transition-transform duration-200 ${
                                isOpen ? 'rotate-180' : ''
                              }`}
                            />
                          </div>

                          <AnimatePresence initial={false}>
                            {isOpen ? (
                              <motion.p
                                initial={{ height: 0, opacity: 0, marginTop: 0 }}
                                animate={{ height: 'auto', opacity: 1, marginTop: 14 }}
                                exit={{ height: 0, opacity: 0, marginTop: 0 }}
                                transition={{ duration: 0.24, ease: 'easeOut' }}
                                className="overflow-hidden text-sm leading-7 text-[var(--text-secondary)]"
                              >
                                {item.description}
                              </motion.p>
                            ) : null}
                          </AnimatePresence>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </PixelPanel>
        </motion.div>
      ))}
    </div>
  );
}

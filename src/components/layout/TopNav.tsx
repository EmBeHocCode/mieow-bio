import { navItems } from '../../data/site';
import { PixelButton } from '../pixel/PixelButton';
import { PixelPanel } from '../pixel/PixelPanel';

type TopNavProps = {
  activeSection: string;
};

export function TopNav({ activeSection }: TopNavProps) {
  return (
    <div className="fixed inset-x-0 top-4 z-50 px-4">
      <div className="page-shell px-0">
        <PixelPanel className="px-4 py-3 sm:px-5">
          <div className="flex items-center gap-3">
            <a
              href="#hero"
              className="flex min-w-0 items-center gap-3"
            >
              <span className="pixel-cut flex h-11 w-11 shrink-0 items-center justify-center border border-[var(--accent-border)] bg-[rgba(255,92,214,0.15)] font-pixel text-[0.62rem] tracking-[0.18em] text-[var(--accent-primary)] shadow-neon-soft">
                EB
              </span>
              <div className="min-w-0">
                <p className="truncate font-pixel text-[0.52rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  portfolio.os
                </p>
                <p className="truncate font-display text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                  EmBeby Pixel Hybrid
                </p>
              </div>
            </a>

            <nav className="ml-auto hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;

                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`pixel-cut border px-3 py-2 font-pixel text-[0.52rem] uppercase tracking-[0.16em] transition-all duration-200 ${
                      isActive
                        ? 'border-[var(--accent-border)] bg-[rgba(255,92,214,0.14)] text-[var(--accent-primary)]'
                        : 'border-transparent bg-transparent text-[var(--text-muted)] hover:border-white/10 hover:bg-white/[0.04] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </nav>

            <PixelButton
              href="mailto:mieowshopsite@gmail.com"
              size="sm"
              className="hidden lg:inline-flex"
            >
              Contact
            </PixelButton>
          </div>

          <div className="hide-scrollbar mt-3 flex gap-2 overflow-x-auto md:hidden">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`pixel-cut whitespace-nowrap border px-3 py-2 font-pixel text-[0.5rem] uppercase tracking-[0.16em] transition-all duration-200 ${
                    isActive
                      ? 'border-[var(--accent-border)] bg-[rgba(255,92,214,0.14)] text-[var(--accent-primary)]'
                      : 'border-white/8 bg-white/[0.03] text-[var(--text-muted)]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </PixelPanel>
      </div>
    </div>
  );
}

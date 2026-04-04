import { motion } from 'framer-motion';
import { BookOpenText, Bot, Boxes, FolderCode, ScanSearch, ShoppingBag } from 'lucide-react';
import { projects } from '../../data/site';
import { PixelBadge } from '../pixel/PixelBadge';
import { PixelButton } from '../pixel/PixelButton';
import { PixelPanel } from '../pixel/PixelPanel';
import { PixelSectionTitle } from '../pixel/PixelSectionTitle';

const iconMap = {
  window: <FolderCode size={20} />,
  bot: <Bot size={20} />,
  book: <BookOpenText size={20} />,
  scan: <ScanSearch size={20} />,
  bag: <ShoppingBag size={20} />
};

export function ProjectsSection() {
  return (
    <section
      id="projects"
      data-section
      className="scroll-mt-32 py-20 sm:py-24"
    >
      <div className="page-shell">
        <PixelSectionTitle
          label="Archive // Featured Work"
          title="Dự án tiêu biểu"
          description="Một số project mình đã tự học, tự làm và hoàn thiện ở nhiều mức độ khác nhau, từ portfolio cá nhân đến tools và sản phẩm web."
        />

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ y: -5 }}
            >
              <PixelPanel
                tone={project.tone}
                className="group h-full p-6 sm:p-7"
              >
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),transparent_35%,rgba(138,92,255,0.04)_100%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <div className="relative flex h-full flex-col gap-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center pixel-cut border border-white/10 bg-white/[0.05] text-[var(--accent-primary)] shadow-[0_0_24px_rgba(255,92,214,0.18)]">
                        {iconMap[project.icon]}
                      </div>
                      <div>
                        <h3 className="font-display text-xl font-semibold text-[var(--text-primary)]">
                          {project.title}
                        </h3>
                        <p className="mt-1 font-pixel text-[0.54rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                          Case sample
                        </p>
                      </div>
                    </div>

                    <PixelBadge tone={project.tone === 'pink' ? 'pink' : project.tone === 'violet' ? 'violet' : 'muted'}>
                      <Boxes size={10} />
                      {project.status}
                    </PixelBadge>
                  </div>

                  <p className="text-sm leading-7 text-[var(--text-secondary)] sm:text-[0.96rem]">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((stack) => (
                      <PixelBadge
                        key={stack}
                        tone="muted"
                      >
                        {stack}
                      </PixelBadge>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-3 pt-2">
                    {project.actions.map((action, actionIndex) => (
                      <PixelButton
                        key={action.href}
                        href={action.href}
                        external
                        variant={actionIndex === 0 ? 'secondary' : 'ghost'}
                        size="sm"
                      >
                        {action.label}
                      </PixelButton>
                    ))}
                  </div>
                </div>
              </PixelPanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

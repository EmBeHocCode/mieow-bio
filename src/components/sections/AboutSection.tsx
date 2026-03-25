import { motion } from 'framer-motion';
import { GraduationCap, ScanLine, ShieldCheck, UserRound } from 'lucide-react';
import { aboutData } from '../../data/site';
import { PixelBadge } from '../pixel/PixelBadge';
import { PixelPanel } from '../pixel/PixelPanel';
import { PixelSectionTitle } from '../pixel/PixelSectionTitle';

const bulletIcons = [ScanLine, GraduationCap, ShieldCheck];

export function AboutSection() {
  return (
    <section
      id="about"
      data-section
      className="scroll-mt-32 py-20 sm:py-24"
    >
      <div className="page-shell">
        <PixelSectionTitle
          label="Profile // About"
          title="Về tôi"
          description="Giữ nguyên tinh thần chân thật của website gốc, nhưng chuyển khung nội dung sang pixel panel sắc nét và dễ scan hơn."
        />

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55 }}
          >
            <PixelPanel className="h-full p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-3 border-b border-white/8 pb-5">
                <PixelBadge tone="pink">
                  <UserRound size={10} />
                  {aboutData.name}
                </PixelBadge>
                <PixelBadge tone="violet">
                  <GraduationCap size={10} />
                  BETU • K23
                </PixelBadge>
              </div>

              <p className="mt-5 text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                {aboutData.school}
              </p>

              <div className="mt-8 space-y-4">
                {aboutData.bullets.map((bullet, index) => {
                  const Icon = bulletIcons[index] ?? ScanLine;

                  return (
                    <div
                      key={bullet}
                      className="flex gap-4 rounded-[0.9rem] border border-white/6 bg-white/[0.03] p-4"
                    >
                      <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center pixel-cut border border-white/10 bg-white/[0.05] text-[var(--accent-primary)]">
                        <Icon size={16} />
                      </div>
                      <p className="text-sm leading-7 text-[var(--text-secondary)] sm:text-[0.96rem]">
                        {bullet}
                      </p>
                    </div>
                  );
                })}
              </div>
            </PixelPanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <PixelPanel
              tone="violet"
              className="h-full p-6 sm:p-8"
            >
              <p className="font-pixel text-[0.58rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                Main Info
              </p>
              <div className="mt-5 space-y-4">
                {aboutData.meta.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[0.9rem] border border-white/8 bg-white/[0.03] p-4"
                  >
                    <p className="font-pixel text-[0.54rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      {item.label}
                    </p>
                    <p className="mt-2 font-display text-lg font-semibold text-[var(--text-primary)]">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </PixelPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { BrainCircuit, Sparkles } from 'lucide-react';
import { businessConcept } from '../../data/site';
import { PixelBadge } from '../pixel/PixelBadge';
import { PixelPanel } from '../pixel/PixelPanel';
import { PixelSectionTitle } from '../pixel/PixelSectionTitle';

export function BusinessConceptSection() {
  return (
    <section
      id="business-tools"
      className="py-20 sm:py-24"
    >
      <div className="page-shell">
        <PixelSectionTitle
          label="Concept // Quiet Zone"
          title={businessConcept.title}
          description="Section này được giữ ngắn và yên hơn để tạo điểm nghỉ thị giác trước khi sang phần liên hệ."
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55 }}
        >
          <PixelPanel
            tone="violet"
            className="p-6 sm:p-8 lg:p-10"
          >
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <PixelBadge tone="pink">
                  <Sparkles size={10} />
                  Concept
                </PixelBadge>
                <h3 className="mt-5 font-display text-3xl font-semibold text-[var(--text-primary)]">
                  {businessConcept.subtitle}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                  {businessConcept.description}
                </p>
              </div>

              <div className="grid gap-3">
                {businessConcept.chips.map((chip) => (
                  <div
                    key={chip}
                    className="flex items-center gap-3 rounded-[1rem] border border-white/8 bg-white/[0.04] px-4 py-4"
                  >
                    <div className="flex h-10 w-10 items-center justify-center pixel-cut border border-white/10 bg-white/[0.05] text-[var(--accent-primary)]">
                      <BrainCircuit size={18} />
                    </div>
                    <p className="font-display text-lg font-semibold text-[var(--text-primary)]">{chip}</p>
                  </div>
                ))}
              </div>
            </div>
          </PixelPanel>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { Clapperboard, Code2, ShoppingCart } from 'lucide-react';
import { skills } from '../../data/site';
import { PixelBadge } from '../pixel/PixelBadge';
import { PixelCard } from '../pixel/PixelCard';
import { PixelSectionTitle } from '../pixel/PixelSectionTitle';

const iconMap = {
  code: <Code2 size={20} />,
  store: <ShoppingCart size={20} />,
  video: <Clapperboard size={20} />
};

export function SkillsSection() {
  return (
    <section
      id="skills"
      data-section
      className="scroll-mt-32 py-20 sm:py-24"
    >
      <div className="page-shell">
        <PixelSectionTitle
          label="Toolkit // Skills"
          title="Kỹ năng"
          description="Những mảng mình đang học và thực hành nhiều nhất hiện tại, tập trung vào code, e-commerce và quy trình làm nội dung."
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <PixelCard
                icon={iconMap[skill.icon]}
                title={skill.title}
                description={skill.description}
                tone={index === 1 ? 'violet' : 'muted'}
              >
                <div className="flex flex-wrap gap-2">
                  {skill.chips.map((chip) => (
                    <PixelBadge
                      key={chip}
                      tone="muted"
                    >
                      {chip}
                    </PixelBadge>
                  ))}
                </div>
              </PixelCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
